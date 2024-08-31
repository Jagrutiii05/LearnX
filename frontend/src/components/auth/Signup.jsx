import { setLoading } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'

const Signup = () => {

    // Get data
    const [input, setInput] = useState({
        Name: "",
        Email: "",
        Password: "",
        role: "",
        file: ""
    });

    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Change event handler
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // Change File handler
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    // Submit event handler
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("Name", input.Name);
        formData.append("Email", input.Email);
        formData.append("Password", input.Password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "text/plain" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label htmlFor="nameInput">Name</Label>
                        <Input
                            id="nameInput"
                            type="text"
                            value={input.Name}
                            name="Name"
                            autoComplete="name"
                            onChange={changeEventHandler}
                            placeholder="Jagruti Piprade"
                        />
                    </div>
                    <div className='my-2'>
                        <Label htmlFor="emailInput">Email</Label>
                        <Input
                            id="emailInput"
                            type="Email"
                            value={input.Email}
                            name="Email"
                            autoComplete="email"
                            onChange={changeEventHandler}
                            placeholder="jagruti@gmail.com"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label htmlFor="passwordInput">Password</Label>
                        <Input
                            id="passwordInput"
                            type="Password"
                            value={input.Password}
                            name="Password"
                            autoComplete="new-password"
                            onChange={changeEventHandler}
                            placeholder="Jagruti@123"
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        {/* Select option: Learner or Instructor */}
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="learnerRole"
                                    type="radio"
                                    name="role"
                                    value="Learner"
                                    checked={input.role === 'Learner'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="learnerRole">Learner</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="instructorRole"
                                    type="radio"
                                    name="role"
                                    value="Instructor"
                                    checked={input.role === 'Instructor'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="instructorRole">Instructor</Label>
                            </div>
                        </RadioGroup>

                        {/* Profile Photo */}
                        <div className='flex items-center gap-2'>
                            <Label htmlFor="profilePhoto">Profile</Label>
                            <Input
                                id="profilePhoto"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup