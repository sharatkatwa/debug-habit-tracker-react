import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({...habit});

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        // <input value={editData.name} onChange={(e) => (editData.name = e.target.value)} />
        <div className="p-4 bg-white rounded-lg border border-slate-200 transition-all shadow-sm">
          <div className="space-y-3" data-protonpass-form="">
            <label className="text-xs font-semibold text-slate-500 uppercase">Edit Habit</label>
            <input
            onChange={(e) => (editData.name = e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 focus:border-indigo-500 outline-none text-sm"
              defaultValue={editData.name}
            />
            <div className="grid grid-cols-2 gap-2">
              <select defaultValue={editData.priority} onChange={(e) => (editData.priority = e.target.value)} className="px-2 py-2 rounded border border-slate-200 text-sm bg-white">
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <select defaultValue={editData.category} onChange={(e) => (editData.category = e.target.value)} className="px-2 py-2 rounded border border-slate-200 text-sm bg-white">
                <option value="Health">Health</option>
                <option value="Focus">Focus</option>
                <option value="Growth">Growth</option>
                <option value="Mindset">Mindset</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={ handleSave} className="flex-1 py-2 bg-indigo-600 text-white rounded font-medium text-sm hover:bg-indigo-700">
                Save Changes
              </button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 text-slate-600 rounded font-medium text-sm border border-slate-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-4 bg-white rounded-lg border border-slate-200 transition-all ${isDoneToday?'opacity-75':'shadow-sm'}`}>
          <div className="space-y-4" data-protonpass-form="">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600">{habit.category}</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded text-red-600 bg-red-50">
                    {habit.priority}
                  </span>
                </div>
                <h3 className={`text-lg font-bold  ${isDoneToday?'text-slate-400 line-through':'text-slate-800'}`}>{habit.name}</h3>
              </div>
              <div className="text-right ml-4">
                <div className="flex items-center justify-end text-slate-700">
                  <span className="text-sm font-bold">{getStreak(habit.completedDates)}</span>
                  <span className="ml-1 text-orange-500 font-black text-xs">^^</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Streak</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 border-l-2 border-slate-100 pl-3 py-0.5">{habit.motivation}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs">
                <span className="text-slate-400 block font-medium uppercase">Goal</span>
                <span className="font-semibold text-slate-700">
                  {habit.goalValue} {habit.unit}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <button onClick={() => setEditing(prev => !prev)} className="p-1.5 text-slate-600 hover:text-blue-900 transition-colors" title="Edit">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteHabit(habit.id);
                    }}
                    className="p-1.5 text-slate-700 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
                <button onClick={() =>toggleHabit(habit.id)} className={`px-4 py-2 rounded text-sm font-semibold transition-colors  ${isDoneToday?'bg-slate-100 text-slate-500':'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  {isDoneToday?'Completed':'Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
