import React from "react";

const AboutMe = ({ useLabel = true }) => {
  return (
    <>
      <div className="space-y-4 font-sans">
        {useLabel && (
          <>
            <h2 className="text-2xl font-bold mb-3">About Me</h2>
            <div className="w-full h-px dark:bg-white/10"></div>
          </>
        )}
        <h3 className="">
          Mohammad Amin Saeidi Rad: A Journey from Curious Teen Coder to
          Front-End Mastery
        </h3>

        <p>
          In the vibrant world of modern web development, few stories inspire as
          much as that of <strong>Mohammad Amin Saeidi Rad</strong>, a young
          Iranian talent whose passion for programming ignited at the tender age
          of 14.
        </p>

        <p>
          Born and raised in <strong>Bojnord</strong>, a city nestled in the
          northeastern province of <strong>North Khorasan</strong>, Iran,
          Mohammad Amin's early life was marked by an insatiable curiosity about
          technology.
        </p>
        <p>
          It was around nine years ago, in the midst of his teenage years, that
          he typed his very first lines of code—not on a sleek modern IDE, but
          in the humble confines of <strong>Visual Basic</strong>.
        </p>
        <p>
          This simple act of creation, building rudimentary programs that
          brought his ideas to life on a flickering screen, planted the seeds of
          what would become a lifelong dedication to software engineering.
        </p>
        <p>
          Little did he know that this spark would evolve into a blazing
          trailblazing career in front-end development, education, and community
          building.
        </p>

        <p>
          As Mohammad Amin navigated the challenges of adolescence, his
          interests quickly outgrew the basics of Visual Basic.
        </p>
        <p>
          By his mid-teens, he had delved into{" "}
          <strong>mobile app development</strong>, mastering{" "}
          <strong>Java</strong> to craft applications that ran on Android
          devices.
        </p>
        <p>
          This phase was transformative; it wasn't just about learning syntax or
          debugging errors—it was about understanding the intricate dance
          between user interfaces and backend logic.
        </p>
        <p>
          He spent countless late nights experimenting with layouts, optimizing
          performance, and dreaming up features that could make everyday tasks
          more intuitive.
        </p>
        <p>
          These self-taught explorations weren't confined to solitary coding
          sessions; they were fueled by online forums, YouTube tutorials, and
          the global developer community that welcomed him with open arms.
        </p>
        <p>
          By the time he entered university, Mohammad Amin had already built a
          portfolio of personal projects that showcased his growing expertise,
          from interactive mobile prototypes to early web experiments.
        </p>

        <p>
          Today, at <strong>25 years old</strong>, Mohammad Amin Saeidi Rad
          stands as a beacon for aspiring developers in Iran and beyond.
        </p>
        <p>
          He is a <strong>third-year student</strong> of{" "}
          <strong>Computer Engineering</strong> at{" "}
          <strong>Bojnord University</strong>, a prestigious public institution
          known for its rigorous curriculum in software sciences.
        </p>
        <p>
          Balancing demanding coursework in algorithms, data structures, and
          computer networks with his entrepreneurial pursuits has honed his
          time-management skills to a razor's edge.
        </p>
        <p>Yet, what truly sets him apart is his commitment to education.</p>
        <p>
          As a <strong>lead instructor</strong> at <strong>SabzLearn</strong>,
          one of Iran's premier online learning platforms for tech skills,
          Mohammad Amin has touched the lives of thousands through his engaging,
          project-based courses.
        </p>
        <p>
          His teaching philosophy is refreshingly practical:{" "}
          <em>
            "Code isn't just theory—it's about solving real problems with clean,
            efficient solutions."
          </em>
        </p>
        <p>
          This mantra shines through in his meticulously designed curricula,
          which demystify complex topics for beginners while challenging
          intermediates to push boundaries.
        </p>
      </div>
    </>
  );
};

export default AboutMe;
