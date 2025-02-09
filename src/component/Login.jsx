import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth"; 
import { login } from "../store/authSlice";

function Login({ isOpen, onClose, switchToSignUp }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const session = await authService.login(data); 
      if (session) {
        const user = await authService.getCurrentUser(); 
        dispatch(login(user)); 
        onClose(); 
      }
    } catch (error) {
      setError("email", { type: "manual", message: "Invalid email or password" });
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300"
      onClick={(e) => e.target.id === "modal-backdrop" && onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative animate-fadeIn scale-100 transition-transform duration-300">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          ✖
        </button>

        <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <button
            onClick={() => {
              onClose();
              switchToSignUp();
            }}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </button>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <Button type="submit" className="w-full mt-4">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
