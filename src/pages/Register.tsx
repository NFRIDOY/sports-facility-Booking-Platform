import { useForm, SubmitHandler } from "react-hook-form";
import { logo } from "../utils/images/logo";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../types/user.interface";
import { SuccessAlert } from "../components/ui/Alerts/SuccessAlert";
import { usePostUserRegisterMutation } from "../redux/api/api";
import { ErrorAlert } from "../components/ui/Alerts/ErrorAlert";
import Loading from "../components/ui/Loadings/Loading";
import { USER_Role } from "../types/user.constants";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>({
        defaultValues: {
            role: USER_Role.user, // default value
            email: "", // default
            address: "", // default
            name: "", // default
            password: "", // default
            phone: "", // default
        },
    });

    const [
        postUserRegister,
        {
            data: postUserRegisterData,
            isLoading: isLoadingUserRegister,
            isError,
        },
    ] = usePostUserRegisterMutation();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IUser> = async (data) => {
        console.log("data =>>", data);

        // send data to server use RTK
        await postUserRegister(data);

        // alart
        if (isError) {
            console.log("Error: " + postUserRegisterData);
            ErrorAlert();
            return;
        }

        if (!isLoadingUserRegister) {
            // console.log("Success: ", postUserLoginData?.success);
            await SuccessAlert("Registration Successful");
            navigate("/login");
        }

        if (postUserRegister) {
            // console.log("Success: ", postUserRegister?.success);
            console.log("postUserRegister : ", postUserRegister);
        }
    };

    // console.log(watch("email")); // watch input value by passing the name of it

    if (isLoadingUserRegister) {
        return <Loading />;
    }

    // if (isError) {
    //     // ErrorAlert();
    //     return <ErrorCommon />;
    // }

    return (
        <div className="">
            <div className="bg-green-100 flex flex-row-reverse justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:flex justify-center items-center ">
                    <Link to={"/"}>
                        <img
                            // src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
                            src={logo}
                            alt="Placeholder Image"
                            className="object-cover size-96"
                        />
                    </Link>
                </div>

                <div className="lg:px-36 md:px-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 bg-green-100">
                            <label
                                htmlFor="name"
                                className="block text-gray-600">
                                Name{" "}
                                <span className="text-red-500">
                                    {errors.name && "is required"}
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                id="name"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4 bg-green-100">
                            <label
                                htmlFor="email"
                                className="block text-gray-600">
                                Email{" "}
                                <span className="text-red-500">
                                    {errors.email && "is required"}
                                </span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                id="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4 bg-green-100">
                            <label
                                htmlFor="phone"
                                className="block text-gray-600">
                                Phone{" "}
                                <span className="text-red-500">
                                    {errors.phone && "is required"}
                                </span>
                            </label>
                            <input
                                type="tel"
                                {...register("phone", { required: true })}
                                id="phone"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4 bg-green-100">
                            <label
                                htmlFor="address"
                                className="block text-gray-600">
                                Address{" "}
                                <span className="text-red-500">
                                    {errors.address && "is required"}
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("address", { required: true })}
                                id="address"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-600">
                                Password{" "}
                                <span className="text-red-500">
                                    {errors.password && "is required"}
                                </span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-green-500 text-center">
                        <Link to={"/login"} className="hover:underline">
                            Log in Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
