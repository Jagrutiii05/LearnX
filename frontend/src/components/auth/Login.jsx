import { setLoading, setUser } from '@/redux/authSlice'
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

const Login = () => {
    // Get data
    const [input, setInput] = useState({
        Email: "",
        Password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            // if successful login: navigate to home page
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
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
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label htmlFor="emailInput">Email</Label>
                        <Input
                            id="emailInput"
                            type="Email"
                            value={input.Email}
                            name="Email"
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
                            onChange={changeEventHandler}
                            placeholder="Jagruti@123"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
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
                                    id="Instructor"
                                    type="radio"
                                    name="role"
                                    value="Instructor"
                                    checked={input.role === 'Instructor'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="Instructor">Instructor</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* When Loading: show "please wait" */}
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>{"Don't have an account?"} <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login