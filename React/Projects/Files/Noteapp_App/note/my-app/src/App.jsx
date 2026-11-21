import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  Clock3,
  Activity,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Bell,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import Dashboard from "./components/Dashboard";
import BackupPage from "./components/BackupPage";
import CompletedTasks from "./components/CompletedTasks";
import RemindersPage from "./components/RemindersPage";
import PrivateNoteDialog from "./components/PrivateNoteDialog";
import NoteTemplatesDialog from "./components/NoteTemplatesDialog";

import {
  encryptNoteData,
  decryptNoteData,
} from "./utils/noteSecurity";

const availableTags = [
  { name: "Work", color: "blue" },
  { name: "Personal", color: "purple" },
  { name: "Ideas", color: "yellow" },
  { name: "Finance", color: "green" },
  { name: "Health", color: "pink" },
];

const activityTypes = [
  "created",
  "updated",
  "trashed",
  "restored",
  "deleted",
  "completed",
  "uncompleted",
];

const PRIVATE_TITLE_FA = "یادداشت خصوصی";
const PRIVATE_TITLE_EN = "Private note";

function normalizeNote(note) {
  return {
    ...note,
    isTrashed: note.isTrashed ?? false,
    isFavorite: note.isFavorite ?? false,
    isCompleted: note.isCompleted ?? false,
    completedAt: note.completedAt ?? null,
    reminderAt: note.reminderAt ?? null,
    tags: note.tags ?? [],
    folderId: note.folderId ?? null,
    isPrivate: note.isPrivate ?? false,
  };
}

function App() {
  const { i18n } = useTranslation();
  const isPersian = i18n.language === "fa";

  const [viewMode, setViewMode] = useState("grid");

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("smart-notes-theme") === "dark";
  });

  function toggleTheme() {
    setIsDarkMode((previous) => !previous);
  }

  useEffect(() => {
    localStorage.setItem(
      "smart-notes-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // Notes
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("smart-notes");
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.map(normalizeNote);
    } catch {
      return [];
    }
  });

  // Folders
  const [folders, setFolders] = useState(() => {
    try {
      const saved = localStorage.getItem("smart-notes-folders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Activity history
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("smart-notes-activities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activityFilter, setActivityFilter] = useState("all");

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("all");
  const [activeTag, setActiveTag] = useState(null);
  const [activeFolderId, setActiveFolderId] = useState(null);

  // Note templates
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] =
    useState(false);

  // Reminder notification
  const [reminderToast, setReminderToast] = useState(null);

  // Private notes
  // Decrypted content is kept only in memory, never directly in localStorage.
  const [unlockedNotes, setUnlockedNotes] = useState({});
  const [privateDialog, setPrivateDialog] = useState(null);
  const [privateDialogError, setPrivateDialogError] = useState("");
  const [privateDialogBusy, setPrivateDialogBusy] = useState(false);

  const unlockedNotesRef = useRef({});
  const encryptionQueueRef = useRef({});

  useEffect(() => {
    unlockedNotesRef.current = unlockedNotes;
  }, [unlockedNotes]);

  // Save notes
  useEffect(() => {
    localStorage.setItem("smart-notes", JSON.stringify(notes));
  }, [notes]);

  // Save folders
  useEffect(() => {
    localStorage.setItem("smart-notes-folders", JSON.stringify(folders));
  }, [folders]);

  // Save activities
  useEffect(() => {
    localStorage.setItem(
      "smart-notes-activities",
      JSON.stringify(activities)
    );
  }, [activities]);

  // Encrypt changed private note content before saving it.
  useEffect(() => {
    Object.entries(unlockedNotes).forEach(([noteId, unlocked]) => {
      if (!unlocked?.password || !unlocked?.dirty) return;

      if (encryptionQueueRef.current[noteId]) {
        clearTimeout(encryptionQueueRef.current[noteId]);
      }

      encryptionQueueRef.current[noteId] = setTimeout(async () => {
        try {
          const encrypted = await encryptNoteData(
            unlocked.title,
            unlocked.content,
            unlocked.password
          );

          const latest = unlockedNotesRef.current[noteId];

          // Do not overwrite a newer edit or a newly locked note.
          if (
            !latest ||
            latest.password !== unlocked.password ||
            latest.title !== unlocked.title ||
            latest.content !== unlocked.content
          ) {
            return;
          }

          setNotes((previous) =>
            previous.map((note) =>
              String(note.id) === String(noteId)
                ? {
                    ...note,
                    ...encrypted,
                    title: "",
                    content: "",
                  }
                : note
            )
          );

          setUnlockedNotes((previous) => {
            const current = previous[noteId];
            if (!current) return previous;

            return {
              ...previous,
              [noteId]: {
                ...current,
                dirty: false,
              },
            };
          });
        } catch (error) {
          console.error("Private note encryption error:", error);
        }
      }, 700);
    });

    return () => {
      Object.values(encryptionQueueRef.current).forEach(clearTimeout);
    };
  }, [unlockedNotes]);

  // Check reminders every 10 seconds
  useEffect(() => {
    function checkReminders() {
      let notifiedReminders = [];

      try {
        notifiedReminders = JSON.parse(
          localStorage.getItem("smart-notes-notified-reminders") || "[]"
        );
      } catch {
        notifiedReminders = [];
      }

      const notifiedSet = new Set(notifiedReminders);

      const dueNotes = notes.filter((note) => {
        if (!note.reminderAt || note.isTrashed || note.isCompleted) {
          return false;
        }

        const reminderTime = new Date(note.reminderAt).getTime();

        return (
          !Number.isNaN(reminderTime) &&
          reminderTime <= Date.now()
        );
      });

      dueNotes.forEach((note) => {
        const reminderKey = `${note.id}-${note.reminderAt}`;

        if (notifiedSet.has(reminderKey)) return;

        notifiedSet.add(reminderKey);

        const title = note.isPrivate
          ? isPersian
            ? PRIVATE_TITLE_FA
            : PRIVATE_TITLE_EN
          : note.title ||
            (isPersian ? "یادداشت بدون عنوان" : "Untitled note");

        const body = isPersian
          ? "زمان یادآوری این یادداشت رسیده است."
          : "It's time for your note reminder.";

        setReminderToast({
          id: reminderKey,
          title,
          body,
        });

        if (
          typeof Notification !== "undefined" &&
          Notification.permission === "granted"
        ) {
          try {
            new Notification(
              isPersian ? "یادآوری Smart Notes" : "Smart Notes Reminder",
              {
                body: `${title} — ${body}`,
                tag: reminderKey,
              }
            );
          } catch (error) {
            console.error("Notification error:", error);
          }
        }
      });

      localStorage.setItem(
        "smart-notes-notified-reminders",
        JSON.stringify(Array.from(notifiedSet).slice(-500))
      );
    }

    checkReminders();

    const intervalId = window.setInterval(checkReminders, 10000);

    return () => window.clearInterval(intervalId);
  }, [notes, isPersian]);

  // Generic title for private notes in activity history.
  function safeNoteTitle(note) {
    if (note?.isPrivate) {
      return isPersian ? PRIVATE_TITLE_FA : PRIVATE_TITLE_EN;
    }

    return note?.title || (isPersian ? "بدون عنوان" : "Untitled");
  }

  // Add activity
  function addActivity(type, note) {
    if (!note) return;

    const activity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      noteId: note.id,
      noteTitle: safeNoteTitle(note),
      timestamp: new Date().toISOString(),
    };

    setActivities((previous) => {
      if (type === "updated") {
        const latest = previous.find(
          (item) =>
            item.type === "updated" &&
            item.noteId === note.id
        );

        if (latest) {
          const difference =
            Date.now() - new Date(latest.timestamp).getTime();

          if (difference < 60000) return previous;
        }
      }

      return [activity, ...previous].slice(0, 500);
    });
  }

  // Remove old titles from activity history when a note becomes private.
  function scrubPrivateActivity(noteId) {
    setActivities((previous) =>
      previous.map((activity) =>
        activity.noteId === noteId
          ? {
              ...activity,
              noteTitle: isPersian ? PRIVATE_TITLE_FA : PRIVATE_TITLE_EN,
            }
          : activity
      )
    );
  }

  // Open note templates dialog
  function addNote() {
    setIsTemplateDialogOpen(true);
  }

  // Create a note from the selected template
  function createNoteFromTemplate(template) {
    const now = new Date().toISOString();

    const newNote = {
      id: Date.now(),
      title: template.title,
      content: template.content,
      isTrashed: false,
      isFavorite: false,
      isCompleted: false,
      completedAt: null,
      reminderAt: null,
      tags: [],
      folderId: activeView === "folder" ? activeFolderId : null,
      isPrivate: false,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((previous) => [...previous, newNote]);
    addActivity("created", newNote);

    setSelectedNoteId(newNote.id);
    setActiveView("all");
    setActiveTag(null);
    setActiveFolderId(null);
    setSearchTerm("");

    setIsTemplateDialogOpen(false);
  }

  // Get a note with decrypted content when it is unlocked.
  function getDisplayNote(note) {
    if (!note) return null;

    if (note.isPrivate && unlockedNotes[note.id]) {
      return {
        ...note,
        title: unlockedNotes[note.id].title,
        content: unlockedNotes[note.id].content,
      };
    }

    return note;
  }

  // Select a note. Locked private notes require a password.
  function handleSelectNote(noteId) {
    const note = notes.find(
      (item) => String(item.id) === String(noteId)
    );

    if (!note) return;

    if (note.isPrivate && !unlockedNotes[note.id]) {
      setPrivateDialog({
        mode: "unlock",
        note,
      });
      setPrivateDialogError("");
      return;
    }

    setSelectedNoteId(noteId);
  }

  // Selected note
  const rawSelectedNote = notes.find(
    (note) =>
      String(note.id) === String(selectedNoteId) &&
      !note.isTrashed &&
      !note.isCompleted
  );

  const selectedNote = getDisplayNote(rawSelectedNote);

  // Make a note private
  function handleMakePrivate(note) {
    if (!note || note.isPrivate) return;

    setPrivateDialog({
      mode: "create",
      note,
    });
    setPrivateDialogError("");
  }

  // Create password and encrypt the note.
  async function handleCreatePrivate(password) {
    const note = privateDialog?.note;

    if (!note) return;

    setPrivateDialogBusy(true);
    setPrivateDialogError("");

    try {
      if (!window.isSecureContext || !crypto?.subtle) {
        throw new Error("SECURE_CONTEXT_REQUIRED");
      }

      const encrypted = await encryptNoteData(
        note.title,
        note.content,
        password
      );

      setNotes((previous) =>
        previous.map((item) =>
          item.id === note.id
            ? {
                ...item,
                ...encrypted,
                isPrivate: true,
                title: "",
                content: "",
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );

      // Remove any previously recorded plain-text title.
      scrubPrivateActivity(note.id);

      setUnlockedNotes((previous) => ({
        ...previous,
        [note.id]: {
          title: note.title,
          content: note.content,
          password,
          dirty: false,
        },
      }));

      setPrivateDialog(null);
      setPrivateDialogError("");
      setSelectedNoteId(note.id);
    } catch (error) {
      console.error("Private note creation error:", error);

      setPrivateDialogError(
        error.message === "SECURE_CONTEXT_REQUIRED"
          ? isPersian
            ? "رمزگذاری در این محیط امن در دسترس نیست. برنامه را با localhost اجرا کن."
            : "Encryption is unavailable in this context. Run the app using localhost."
          : isPersian
            ? "رمزگذاری یادداشت انجام نشد. دوباره تلاش کن."
            : "Could not encrypt the note. Please try again."
      );
    } finally {
      setPrivateDialogBusy(false);
    }
  }

  // Unlock a private note.
  async function handleUnlockPrivate(password) {
    const note = privateDialog?.note;

    if (!note) return;

    setPrivateDialogBusy(true);
    setPrivateDialogError("");

    try {
      if (!window.isSecureContext || !crypto?.subtle) {
        throw new Error("SECURE_CONTEXT_REQUIRED");
      }

      const decrypted = await decryptNoteData(
        note.encryptedData,
        note.encryptionSalt,
        note.encryptionIv,
        password
      );

      setUnlockedNotes((previous) => ({
        ...previous,
        [note.id]: {
          title: decrypted.title || "",
          content: decrypted.content || "",
          password,
          dirty: false,
        },
      }));

      setSelectedNoteId(note.id);
      setPrivateDialog(null);
      setPrivateDialogError("");
    } catch (error) {
      console.error("Private note unlock error:", error);

      setPrivateDialogError(
        error.message === "SECURE_CONTEXT_REQUIRED"
          ? isPersian
            ? "رمزگشایی در این محیط امن در دسترس نیست."
            : "Decryption is unavailable in this context."
          : isPersian
            ? "رمز عبور اشتباه است یا اطلاعات یادداشت قابل بازیابی نیست."
            : "Incorrect password or the note data cannot be recovered."
      );
    } finally {
      setPrivateDialogBusy(false);
    }
  }

  // Save the latest private content immediately before locking.
  async function lockPrivateNote(noteId) {
    const unlocked = unlockedNotesRef.current[noteId];

    if (!unlocked) return;

    setPrivateDialogBusy(true);

    try {
      if (encryptionQueueRef.current[noteId]) {
        clearTimeout(encryptionQueueRef.current[noteId]);
        delete encryptionQueueRef.current[noteId];
      }

      const encrypted = await encryptNoteData(
        unlocked.title,
        unlocked.content,
        unlocked.password
      );

      setNotes((previous) =>
        previous.map((note) =>
          String(note.id) === String(noteId)
            ? {
                ...note,
                ...encrypted,
                title: "",
                content: "",
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );

      setUnlockedNotes((previous) => {
        const next = { ...previous };
        delete next[noteId];
        return next;
      });

      if (String(selectedNoteId) === String(noteId)) {
        setSelectedNoteId(null);
      }
    } catch (error) {
      console.error("Private note lock error:", error);
      window.alert(
        isPersian
          ? "ذخیره رمزگذاری‌شده انجام نشد. یادداشت همچنان باز می‌ماند."
          : "Encrypted saving failed. The note will remain unlocked."
      );
    } finally {
      setPrivateDialogBusy(false);
    }
  }

  // Duplicate note
  async function duplicateNote(noteId) {
    const originalNote = notes.find(
      (note) => String(note.id) === String(noteId)
    );

    if (!originalNote || originalNote.isTrashed) return;

    const unlocked = originalNote.isPrivate
      ? unlockedNotesRef.current[originalNote.id]
      : null;

    if (originalNote.isPrivate && !unlocked) return;

    const now = new Date().toISOString();

    let privateData = {};

    if (originalNote.isPrivate) {
      try {
        privateData = await encryptNoteData(
          unlocked.title,
          unlocked.content,
          unlocked.password
        );
      } catch (error) {
        console.error("Private note duplication error:", error);
        window.alert(
          isPersian
            ? "کپی یادداشت خصوصی انجام نشد."
            : "Could not duplicate the private note."
        );
        return;
      }
    }

    const duplicateId =
      `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const duplicateTitle = originalNote.isPrivate
      ? unlocked.title
      : `${originalNote.title || (isPersian ? "بدون عنوان" : "Untitled")} ${
          isPersian ? "(کپی)" : "(Copy)"
        }`;

    const duplicatedNote = {
      ...originalNote,
      ...privateData,
      id: duplicateId,
      title: originalNote.isPrivate ? "" : duplicateTitle,
      content: originalNote.isPrivate ? "" : originalNote.content,
      isTrashed: false,
      isFavorite: false,
      isCompleted: false,
      completedAt: null,
      reminderAt: null,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((previous) => [...previous, duplicatedNote]);

    if (originalNote.isPrivate) {
      setUnlockedNotes((previous) => ({
        ...previous,
        [duplicateId]: {
          title: duplicateTitle,
          content: unlocked.content,
          password: unlocked.password,
          dirty: false,
        },
      }));
    }

    addActivity("created", duplicatedNote);

    setSelectedNoteId(duplicateId);
    setActiveView("all");
    setActiveTag(null);
    setActiveFolderId(null);
    setSearchTerm("");
  }

  // Update note
  function updateNote(updatedNote) {
    const oldNote = notes.find(
      (note) => String(note.id) === String(updatedNote.id)
    );

    if (!oldNote) return;

    const unlocked = unlockedNotesRef.current[updatedNote.id];
    const isPrivate = oldNote.isPrivate;

    const oldTitle = isPrivate ? unlocked?.title : oldNote.title;
    const oldContent = isPrivate ? unlocked?.content : oldNote.content;

    const hasChanged =
      oldTitle !== updatedNote.title ||
      oldContent !== updatedNote.content;

    const reminderChanged =
      oldNote.reminderAt !== updatedNote.reminderAt;

    if (
      reminderChanged &&
      updatedNote.reminderAt &&
      typeof Notification !== "undefined" &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission().catch((error) => {
        console.error("Notification permission error:", error);
      });
    }

    if (reminderChanged && updatedNote.reminderAt) {
      try {
        const savedKeys = JSON.parse(
          localStorage.getItem("smart-notes-notified-reminders") || "[]"
        );

        const newKey = `${updatedNote.id}-${updatedNote.reminderAt}`;

        localStorage.setItem(
          "smart-notes-notified-reminders",
          JSON.stringify(savedKeys.filter((key) => key !== newKey))
        );
      } catch {
        // Ignore invalid notification history.
      }
    }

    if (isPrivate) {
      if (!unlocked) return;

      setUnlockedNotes((previous) => ({
        ...previous,
        [updatedNote.id]: {
          ...previous[updatedNote.id],
          title: updatedNote.title,
          content: updatedNote.content,
          dirty:
            previous[updatedNote.id].dirty ||
            hasChanged,
        },
      }));

      // Only metadata is stored in the notes list.
      setNotes((previous) =>
        previous.map((note) =>
          note.id === updatedNote.id
            ? {
                ...note,
                color: updatedNote.color,
                folderId: updatedNote.folderId ?? null,
                tags: updatedNote.tags ?? [],
                reminderAt: updatedNote.reminderAt ?? null,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );

      if (hasChanged) {
        addActivity("updated", oldNote);
      }

      return;
    }

    setNotes((previous) =>
      previous.map((note) =>
        note.id === updatedNote.id
          ? {
              ...updatedNote,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );

    if (hasChanged) {
      addActivity("updated", updatedNote);
    }
  }

  // Complete or uncomplete a note
  function toggleComplete(noteId) {
    const note = notes.find(
      (item) => String(item.id) === String(noteId)
    );

    if (!note || note.isTrashed) return;

    const willBeCompleted = !note.isCompleted;
    const now = new Date().toISOString();

    const updatedNote = {
      ...note,
      isCompleted: willBeCompleted,
      completedAt: willBeCompleted ? now : null,
      updatedAt: now,
    };

    setNotes((previous) =>
      previous.map((item) =>
        item.id === noteId ? updatedNote : item
      )
    );

    addActivity(
      willBeCompleted ? "completed" : "uncompleted",
      updatedNote
    );

    if (willBeCompleted && selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  }

  // Move note to trash
  function moveToTrash(noteId) {
    const note = notes.find(
      (item) => String(item.id) === String(noteId)
    );

    if (!note) return;

    setNotes((previous) =>
      previous.map((item) =>
        item.id === noteId
          ? { ...item, isTrashed: true }
          : item
      )
    );

    addActivity("trashed", note);

    setUnlockedNotes((previous) => {
      const next = { ...previous };
      delete next[noteId];
      return next;
    });

    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  }

  // Restore note
  function restoreNote(noteId) {
    const note = notes.find(
      (item) => String(item.id) === String(noteId)
    );

    if (!note) return;

    setNotes((previous) =>
      previous.map((item) =>
        item.id === noteId
          ? { ...item, isTrashed: false }
          : item
      )
    );

    addActivity("restored", note);
  }

  // Permanently delete note
  function deletePermanently(noteId) {
    const note = notes.find(
      (item) => String(item.id) === String(noteId)
    );

    if (!note) return;

    addActivity("deleted", note);

    setNotes((previous) =>
      previous.filter((item) => item.id !== noteId)
    );

    setUnlockedNotes((previous) => {
      const next = { ...previous };
      delete next[noteId];
      return next;
    });

    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  }

  // Toggle favorite
  function toggleFavorite(noteId) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === noteId
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      )
    );
  }

  // Move note to another folder
  function moveNoteToFolder(noteId, folderId) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === noteId
          ? { ...note, folderId: folderId || null }
          : note
      )
    );
  }

  // Change sidebar view
  function changeView(view) {
    setActiveView(view);
    setActiveTag(null);
    setActiveFolderId(null);
    setSelectedNoteId(null);
    setSearchTerm("");
  }

  // Open note connected to a reminder
  function openReminderNote(noteId) {
    handleSelectNote(noteId);
    setActiveView("all");
    setActiveTag(null);
    setActiveFolderId(null);
    setSearchTerm("");
  }

  // Clear a note reminder
  function clearReminder(note) {
    const displayNote = getDisplayNote(note);

    if (displayNote) {
      updateNote({
        ...displayNote,
        reminderAt: null,
      });
    }
  }

  // Select tag
  function selectTag(tagName) {
    setActiveView("tag");
    setActiveTag(tagName);
    setActiveFolderId(null);
    setSelectedNoteId(null);
  }

  // Create folder
  function createFolder(name, color) {
    const newFolder = {
      id: Date.now(),
      name,
      color,
    };

    setFolders((previous) => [...previous, newFolder]);
  }

  // Select folder
  function selectFolder(folderId) {
    setActiveView("folder");
    setActiveFolderId(folderId);
    setActiveTag(null);
    setSelectedNoteId(null);
  }

  // Rename folder
  function renameFolder(folderId, newName) {
    setFolders((previous) =>
      previous.map((folder) =>
        folder.id === folderId
          ? { ...folder, name: newName }
          : folder
      )
    );
  }

  // Delete folder without deleting its notes
  function deleteFolder(folderId) {
    setFolders((previous) =>
      previous.filter((folder) => folder.id !== folderId)
    );

    setNotes((previous) =>
      previous.map((note) =>
        note.folderId === folderId
          ? { ...note, folderId: null }
          : note
      )
    );

    if (activeFolderId === folderId) {
      setActiveFolderId(null);
      setActiveView("all");
      setSelectedNoteId(null);
    }
  }

  // Restore backup
  function restoreBackup(data) {
    setNotes(
      (data.notes ?? []).map((note) => normalizeNote(note))
    );

    setFolders(data.folders ?? []);
    setActivities(data.activities ?? []);

    setUnlockedNotes({});
    unlockedNotesRef.current = {};

    setSelectedNoteId(null);
    setActiveView("all");
    setActiveTag(null);
    setActiveFolderId(null);
    setSearchTerm("");
    setActivityFilter("all");
    setPrivateDialog(null);
  }

  // Filter notes.
  // Private note contents are never searched, even while unlocked.
  const filteredNotes = notes.filter((note) => {
    const belongsToView =
      activeView === "trash"
        ? note.isTrashed
        : activeView === "completed"
          ? !note.isTrashed && note.isCompleted
          : activeView === "favorites"
            ? !note.isTrashed &&
              !note.isCompleted &&
              note.isFavorite
            : activeView === "tag"
              ? !note.isTrashed &&
                !note.isCompleted &&
                note.tags.includes(activeTag)
              : activeView === "folder"
                ? !note.isTrashed &&
                  !note.isCompleted &&
                  note.folderId === activeFolderId
                : !note.isTrashed && !note.isCompleted;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch = note.isPrivate
      ? search === ""
      : (note.title || "").toLowerCase().includes(search) ||
        (note.content || "").toLowerCase().includes(search);

    return belongsToView && matchesSearch;
  });

  // Show decrypted data only for unlocked private notes.
  const displayNotes = filteredNotes.map((note) =>
    getDisplayNote(note)
  );

  const unlockedNoteIds = Object.keys(unlockedNotes);

  // Activity labels and icons
  const activityLabels = {
    created: {
      en: "Created a note",
      fa: "یادداشت جدید ایجاد کرد",
      icon: Plus,
      color: "#36a878",
      background: isDarkMode ? "#203d35" : "#e8f7ef",
    },
    updated: {
      en: "Updated a note",
      fa: "یادداشت را ویرایش کرد",
      icon: Pencil,
      color: "#8b7bea",
      background: isDarkMode ? "#342f4d" : "#f0edff",
    },
    trashed: {
      en: "Moved a note to trash",
      fa: "یادداشت را به سطل زباله منتقل کرد",
      icon: Trash2,
      color: "#d99b55",
      background: isDarkMode ? "#493a2b" : "#fff4e6",
    },
    restored: {
      en: "Restored a note",
      fa: "یادداشت را بازیابی کرد",
      icon: RotateCcw,
      color: "#55a6cf",
      background: isDarkMode ? "#263d4b" : "#eaf6fc",
    },
    deleted: {
      en: "Permanently deleted a note",
      fa: "یادداشت را برای همیشه حذف کرد",
      icon: X,
      color: "#dc8292",
      background: isDarkMode ? "#49313a" : "#ffedf0",
    },
    completed: {
      en: "Completed a note",
      fa: "یادداشت را تکمیل کرد",
      icon: CheckCircle2,
      color: "#36a878",
      background: isDarkMode ? "#203d35" : "#e8f7ef",
    },
    uncompleted: {
      en: "Reopened a completed note",
      fa: "یادداشت را به حالت فعال برگرداند",
      icon: RotateCcw,
      color: "#55a6cf",
      background: isDarkMode ? "#263d4b" : "#eaf6fc",
    },
  };

  const themeColors = {
    background: isDarkMode ? "#20232d" : "#f8f9fc",
    card: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#3a3e4c" : "#ececf2",
    soft: isDarkMode ? "#303441" : "#f4f5f9",
  };

  // Format activity time
  function formatActivityTime(timestamp) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(timestamp));
  }

  // Format activity date
  function formatActivityDate(timestamp) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(new Date(timestamp));
  }

  // Get local date key
  function getDateKey(timestamp) {
    const date = new Date(timestamp);

    return [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ].join("-");
  }

  // Group activities by day
  function getActivityGroups(items) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayKey = getDateKey(today);
    const yesterdayKey = getDateKey(yesterday);

    const groups = [];

    items.forEach((activity) => {
      const key = getDateKey(activity.timestamp);

      let group = groups.find((item) => item.key === key);

      if (!group) {
        let title;

        if (key === todayKey) {
          title = isPersian ? "امروز" : "Today";
        } else if (key === yesterdayKey) {
          title = isPersian ? "دیروز" : "Yesterday";
        } else {
          title = formatActivityDate(activity.timestamp);
        }

        group = {
          key,
          title,
          items: [],
        };

        groups.push(group);
      }

      group.items.push(activity);
    });

    return groups;
  }

  // Clear activity history
  function clearActivityHistory() {
    const confirmed = window.confirm(
      isPersian
        ? "آیا مطمئنی می‌خواهی تمام تاریخچه فعالیت‌ها پاک شود؟"
        : "Are you sure you want to clear all activity history?"
    );

    if (confirmed) {
      setActivities([]);
    }
  }

  // Activity History View
  function renderActivityHistory() {
    const filteredActivities =
      activityFilter === "all"
        ? activities
        : activities.filter(
            (activity) => activity.type === activityFilter
          );

    const activityGroups = getActivityGroups(filteredActivities);

    const filterLabels = {
      all: isPersian ? "همه فعالیت‌ها" : "All activity",
      created: isPersian ? "ایجاد" : "Created",
      updated: isPersian ? "ویرایش" : "Updated",
      trashed: isPersian ? "انتقال به زباله" : "Trashed",
      restored: isPersian ? "بازیابی" : "Restored",
      deleted: isPersian ? "حذف دائمی" : "Deleted",
      completed: isPersian ? "تکمیل‌شده" : "Completed",
      uncompleted: isPersian ? "بازگردانی" : "Reopened",
    };

    return (
      <div
        style={{
          padding: "30px",
          minHeight: "100%",
          height: "100%",
          boxSizing: "border-box",
          overflowY: "auto",
          background: themeColors.background,
          color: themeColors.text,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "13px",
                  display: "grid",
                  placeItems: "center",
                  color: "#8b7bea",
                  background: isDarkMode ? "#38334f" : "#f0edff",
                }}
              >
                <Activity size={22} />
              </div>

              <h1
                style={{
                  fontSize: "25px",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {isPersian ? "تاریخچه فعالیت‌ها" : "Activity History"}
              </h1>
            </div>

            <p
              style={{
                color: themeColors.muted,
                margin: 0,
                fontSize: "14px",
              }}
            >
              {isPersian
                ? "مروری بر تمام کارهایی که در Smart Notes انجام داده‌ای"
                : "A closer look at everything you've done in Smart Notes"}
            </p>
          </div>

          <button
            onClick={clearActivityHistory}
            disabled={activities.length === 0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: `1px solid ${
                activities.length
                  ? isDarkMode
                    ? "#68404b"
                    : "#f4d5dc"
                  : themeColors.border
              }`,
              borderRadius: "11px",
              padding: "10px 15px",
              background: activities.length
                ? isDarkMode
                  ? "#49343d"
                  : "#fff1f3"
                : themeColors.soft,
              color: activities.length ? "#dc8292" : themeColors.muted,
              cursor: activities.length ? "pointer" : "not-allowed",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            <Trash2 size={15} />
            {isPersian ? "پاک کردن تاریخچه" : "Clear history"}
          </button>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "13px",
            marginBottom: "25px",
          }}
        >
          {[
            {
              label: isPersian ? "کل فعالیت‌ها" : "Total activities",
              count: activities.length,
              icon: Activity,
              color: "#8b7bea",
            },
            {
              label: isPersian ? "یادداشت‌های ایجادشده" : "Notes created",
              count: activities.filter((item) => item.type === "created").length,
              icon: Plus,
              color: "#36a878",
            },
            {
              label: isPersian ? "ویرایش‌ها" : "Edits",
              count: activities.filter((item) => item.type === "updated").length,
              icon: Pencil,
              color: "#8b7bea",
            },
            {
              label: isPersian ? "تکمیل‌شده‌ها" : "Completed",
              count: activities.filter((item) => item.type === "completed").length,
              icon: CheckCircle2,
              color: "#36a878",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                style={{
                  padding: "17px",
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: "14px",
                  background: themeColors.card,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: item.color,
                    marginBottom: "12px",
                  }}
                >
                  <Icon size={17} />
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>
                    {item.label}
                  </span>
                </div>

                <strong style={{ fontSize: "25px" }}>
                  {item.count}
                </strong>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "9px",
            marginBottom: "23px",
          }}
        >
          {["all", ...activityTypes].map((type) => {
            const selected = activityFilter === type;

            return (
              <button
                key={type}
                onClick={() => setActivityFilter(type)}
                style={{
                  border: `1px solid ${
                    selected ? "#8b7bea" : themeColors.border
                  }`,
                  background: selected
                    ? isDarkMode
                      ? "#38334f"
                      : "#f0edff"
                    : themeColors.card,
                  color: selected ? "#8b7bea" : themeColors.muted,
                  borderRadius: "20px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: selected ? 700 : 500,
                  transition: "all 0.2s ease",
                }}
              >
                {filterLabels[type]}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div
          style={{
            background: themeColors.card,
            border: `1px solid ${themeColors.border}`,
            borderRadius: "18px",
            padding: "24px",
          }}
        >
          {filteredActivities.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "65px 15px",
                color: themeColors.muted,
              }}
            >
              <div
                style={{
                  width: "65px",
                  height: "65px",
                  borderRadius: "20px",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 18px",
                  color: "#8b7bea",
                  background: isDarkMode ? "#38334f" : "#f0edff",
                }}
              >
                <Clock3 size={30} />
              </div>

              <h3
                style={{
                  color: themeColors.text,
                  fontSize: "16px",
                  margin: "0 0 8px",
                }}
              >
                {isPersian
                  ? "فعالیتی برای نمایش وجود ندارد"
                  : "No activities found"}
              </h3>

              <p style={{ fontSize: "13px", margin: 0 }}>
                {isPersian
                  ? "با ایجاد یا ویرایش یادداشت‌ها، فعالیت‌ها اینجا نمایش داده می‌شوند."
                  : "Your note activities will appear here."}
              </p>
            </div>
          ) : (
            <div>
              {activityGroups.map((group, groupIndex) => (
                <section
                  key={group.key}
                  style={{
                    marginBottom:
                      groupIndex === activityGroups.length - 1 ? 0 : "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginBottom: "20px",
                    }}
                  >
                    <CalendarDays size={17} color="#8b7bea" />

                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        margin: 0,
                        color: themeColors.text,
                      }}
                    >
                      {group.title}
                    </h3>

                    <span
                      style={{
                        fontSize: "11px",
                        color: themeColors.muted,
                        background: themeColors.soft,
                        borderRadius: "20px",
                        padding: "3px 9px",
                      }}
                    >
                      {group.items.length}{" "}
                      {isPersian ? "فعالیت" : "activities"}
                    </span>
                  </div>

                  <div>
                    {group.items.map((activity, index) => {
                      const config = activityLabels[activity.type];

                      if (!config) return null;

                      const Icon = config.icon;
                      const isLast = index === group.items.length - 1;

                      return (
                        <div
                          key={activity.id}
                          style={{
                            display: "flex",
                            alignItems: "stretch",
                            gap: "15px",
                            position: "relative",
                            minHeight: "76px",
                          }}
                        >
                          <div
                            style={{
                              width: "42px",
                              minWidth: "42px",
                              position: "relative",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {!isLast && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "42px",
                                  bottom: 0,
                                  width: "2px",
                                  background: themeColors.border,
                                }}
                              />
                            )}

                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                borderRadius: "13px",
                                display: "grid",
                                placeItems: "center",
                                position: "relative",
                                zIndex: 1,
                                color: config.color,
                                background: config.background,
                                border: `1px solid ${config.color}25`,
                              }}
                            >
                              <Icon size={18} strokeWidth={2.2} />
                            </div>
                          </div>

                          <div
                            style={{
                              flex: 1,
                              minWidth: 0,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                              gap: "8px",
                              padding: "3px 0 22px",
                              borderBottom: isLast
                                ? "none"
                                : `1px solid ${themeColors.border}`,
                            }}
                          >
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <p
                                style={{
                                  margin: "0 0 7px",
                                  fontSize: "13px",
                                  fontWeight: 700,
                                  color: themeColors.text,
                                }}
                              >
                                {isPersian ? config.fa : config.en}
                              </p>

                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  maxWidth: "100%",
                                  padding: "5px 9px",
                                  borderRadius: "7px",
                                  background: themeColors.soft,
                                  color: themeColors.muted,
                                  fontSize: "12px",
                                }}
                              >
                                <Sparkles
                                  size={12}
                                  style={{ flexShrink: 0 }}
                                />

                                <span
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {activity.noteTitle ||
                                    (isPersian ? "بدون عنوان" : "Untitled")}
                                </span>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: themeColors.muted,
                                fontSize: "11px",
                                whiteSpace: "nowrap",
                                paddingTop: "2px",
                              }}
                            >
                              <Clock3 size={12} />
                              {formatActivityTime(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            color: themeColors.muted,
            fontSize: "12px",
            marginTop: "18px",
            paddingBottom: "10px",
          }}
        >
          <Activity size={13} />
          {isPersian
            ? `${activities.length} فعالیت ذخیره‌شده`
            : `${activities.length} saved activities`}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}
      dir={isPersian ? "rtl" : "ltr"}
      lang={isPersian ? "fa" : "en"}
    >
      {/* Note templates dialog */}
      {isTemplateDialogOpen && (
        <NoteTemplatesDialog
          isPersian={isPersian}
          isDarkMode={isDarkMode}
          onSelect={createNoteFromTemplate}
          onClose={() => setIsTemplateDialogOpen(false)}
        />
      )}

      {/* Private note dialog */}
      {privateDialog && (
        <PrivateNoteDialog
          mode={privateDialog.mode}
          noteTitle={
            privateDialog.mode === "unlock"
              ? isPersian
                ? PRIVATE_TITLE_FA
                : PRIVATE_TITLE_EN
              : privateDialog.note?.title || ""
          }
          onSubmit={
            privateDialog.mode === "create"
              ? handleCreatePrivate
              : handleUnlockPrivate
          }
          onClose={() => {
            if (privateDialogBusy) return;
            setPrivateDialog(null);
            setPrivateDialogError("");
          }}
          isPersian={isPersian}
          isDarkMode={isDarkMode}
          error={privateDialogError}
          busy={privateDialogBusy}
        />
      )}

      {/* In-app reminder notification */}
      {reminderToast && (
        <div
          role="status"
          style={{
            position: "fixed",
            top: "22px",
            right: isPersian ? "auto" : "22px",
            left: isPersian ? "22px" : "auto",
            zIndex: 9999,
            width: "min(360px, calc(100vw - 44px))",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "16px",
            borderRadius: "16px",
            background: isDarkMode ? "#303441" : "#ffffff",
            color: isDarkMode ? "#f1f2f6" : "#242633",
            border: `1px solid ${isDarkMode ? "#4a5060" : "#e8e6f2"}`,
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "12px",
              color: "#8b7bea",
              background: isDarkMode ? "#403b5a" : "#f0edff",
            }}
          >
            <Bell size={20} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <strong
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
              }}
            >
              {isPersian ? "زمان یادآوری رسیده!" : "Reminder is due!"}
            </strong>

            <p
              style={{
                margin: "0 0 5px",
                fontSize: "13px",
                fontWeight: 700,
                overflowWrap: "anywhere",
              }}
            >
              {reminderToast.title}
            </p>

            <span
              style={{
                fontSize: "12px",
                color: isDarkMode ? "#a5a9b8" : "#858899",
              }}
            >
              {reminderToast.body}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setReminderToast(null)}
            aria-label={isPersian ? "بستن اعلان" : "Dismiss notification"}
            style={{
              border: 0,
              background: "transparent",
              color: isDarkMode ? "#a5a9b8" : "#858899",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <Sidebar
        onAddNote={addNote}
        activeView={activeView}
        onChangeView={changeView}
        availableTags={availableTags}
        activeTag={activeTag}
        onSelectTag={selectTag}
        folders={folders}
        activeFolderId={activeFolderId}
        onCreateFolder={createFolder}
        onSelectFolder={selectFolder}
        onRenameFolder={renameFolder}
        onDeleteFolder={deleteFolder}
      />

      <main className="main-content">
        <Header
          onAddNote={addNote}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />

        {activeView === "dashboard" ? (
          <Dashboard
            notes={notes}
            folders={folders}
            isPersian={isPersian}
            isDarkMode={isDarkMode}
          />
        ) : activeView === "activity" ? (
          renderActivityHistory()
        ) : activeView === "backup" ? (
          <BackupPage
            notes={notes}
            folders={folders}
            activities={activities}
            onRestore={restoreBackup}
            isPersian={isPersian}
            isDarkMode={isDarkMode}
          />
        ) : activeView === "completed" ? (
          <CompletedTasks
            notes={notes}
            onToggleComplete={toggleComplete}
            isPersian={isPersian}
            isDarkMode={isDarkMode}
          />
        ) : activeView === "reminders" ? (
          <RemindersPage
            notes={notes}
            onOpenNote={openReminderNote}
            onClearReminder={clearReminder}
            isPersian={isPersian}
            isDarkMode={isDarkMode}
          />
        ) : (
          <div className="notes-layout">
            <NotesList
              viewMode={viewMode}
              notes={displayNotes}
              selectedNoteId={selectedNoteId}
              onSelectNote={handleSelectNote}
              activeView={activeView}
              activeTag={activeTag}
              folders={folders}
              onMoveToFolder={moveNoteToFolder}
              onMoveToTrash={moveToTrash}
              onRestore={restoreNote}
              onDeletePermanently={deletePermanently}
              onToggleFavorite={toggleFavorite}
              onToggleComplete={toggleComplete}
              onDuplicate={duplicateNote}
              unlockedNoteIds={unlockedNoteIds}
            />

            <NoteEditor
              note={selectedNote}
              onUpdateNote={updateNote}
              folders={folders}
              onMakePrivate={handleMakePrivate}
              onLock={lockPrivateNote}
              isUnlocked={
                selectedNote
                  ? !selectedNote.isPrivate ||
                    Boolean(unlockedNotes[selectedNote.id])
                  : false
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;