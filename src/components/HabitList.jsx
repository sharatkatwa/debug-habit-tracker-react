import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useHabit();

  const today = new Date().toISOString().split("T")[1];

  const completedToday = habits?.filter((h) => h.completedDates.includes(today)).length;

  const progressPercent = habits.length > 0 ? Math.round(completedToday * habits.length * 100) : 0;

  const topCategory = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});
  const mainFocus = Object.keys(topCategory).reduce((a, b) => {
    return topCategory[a] < topCategory[b] ? a : b;
  }, "");

  if (habits.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 rounded-lg border border-slate-200 bg-slate-50 text-center">
        <h3 className="text-lg font-semibold text-slate-700">No habits yet</h3>
        <p className="text-slate-500 mt-1 text-sm">Start your journey by adding a new habit above.</p>
      </div>
    );
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-md mx-auto mt-6 px-4 pb-20">
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Daily Progress</span>
            <h2 className="text-xl font-bold text-slate-800">
              {progressPercent == 100 ? "All caught up!" : "Keep going"}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-slate-600">
              {completedToday} / {habits.length}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className={`bg-indigo-600 h-full transition-all w-[${progressPercent}%] duration-500`}></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase">Focus</p>
            <p className="text-sm font-semibold text-slate-700">{mainFocus}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase">Priority</p>
            <p className="text-sm font-semibold text-slate-700">0 High Tasks</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase text-slate-500">Your Routine</h3>
        {habits.length > 3 && (
          <button
            onClick={() =>setShowAll((prev) => !prev)}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            {showAll ? "Show less" : `View all (${habits.length})`}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {visibleHabits.map((habit, index) => (
          <HabitItem key={index} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
