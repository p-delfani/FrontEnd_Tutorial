import {useId, useState} from "react";
import "./app.css"
import toast from "react-hot-toast";


function App(){
    const[username, setusername] = useState("");
    const[password, setpassword] = useState("");

    const id = useId();

    const loginHandler = () =>{
        toast.loading("در حال بررسی اطلاعات ...",{
            duration:2000,
        });


        setTimeout(()=>{
            if(username.length <8){
                return toast.error("نام کاربری باید حداقل 8 کاراکتر باشد")
            }


            if(password.length <8){
                return toast.error("گذرواژه باید حداقل 8 کاراکتر باشد")
            }

            toast.success("ورود با موفقیت")
        })
    }
}