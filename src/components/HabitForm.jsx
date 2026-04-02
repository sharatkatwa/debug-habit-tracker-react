import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit} = useHabit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
  defaultValues: {
    startDate: new Date().toISOString().split("T")[0],
    priority: "Medium", 
    motivation: "",
  },
});

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };

    addHabit(payload);
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onCommit)}>
      {/* <input {...register("name")}  className="outline-none border-1 border-gray-300 rounded p-2"/>
      <input {...register("goalValue")} className="" /> */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Habit Name</label>
        <input
          {...register("name", { required: "Please enter a name" })}
          placeholder="e.g. Morning Exercise"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-placeholder text-sm text-slate-800"
          type="text"
          name="name"
        />
        {errors.name && <p className="text-xs text-red-600 mt-0.5">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Daily Goal</label>
          <input
            {...register("goalValue", { required: "" })}
            placeholder="30"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm"
            type="number"
            name="goalValue"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Unit</label>
          <select
            {...register("unit")}
            name="unit"
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm text-slate-700"
          >
            <option value="mins">Minutes</option>
            <option value="pages">Pages</option>
            <option value="reps">Reps</option>
            <option value="liters">Liters</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Start Date</label>
          <input
            {...register("startDate")}
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm text-slate-700"
            type="date"
            name="startDate"
          
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Category</label>
          <select
            {...register("category")}
            name="category"
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm text-slate-700"
          >
            <option value="Health">Health</option>
            <option value="Focus">Focus</option>
            <option value="Growth">Growth</option>
            <option value="Mindset">Mindset</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Motivation</label>
        <textarea
          {...register("motivation")}
          name="motivation"
          rows="2"
          placeholder="Why is this important to you?"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none transition-all resize-none text-sm text-slate-700"
        ></textarea>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Priority Level</label>
        <div className="grid grid-cols-3 gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("priority")}
              className="w-4 h-4 text-indigo-600 border-slate-300"
              type="radio"
              value="Low"
              name="priority"
            />
            <span className="text-sm text-slate-600">Low</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("priority")}
              className="w-4 h-4 text-indigo-600 border-slate-300"
              type="radio"
              value="Medium"
              name="priority"
            />
            <span className="text-sm text-slate-600">Medium</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("priority")}
              className="w-4 h-4 text-indigo-600 border-slate-300"
              type="radio"
              value="High"
              name="priority"
            />
            <span className="text-sm text-slate-600">High</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors active:bg-indigo-800 mt-2"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;
