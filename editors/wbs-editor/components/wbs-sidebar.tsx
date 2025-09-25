import React from "react";

interface WBSSidebarProps {
  activeView: "tasks" | "team" | "dependencies";
  onViewChange: (view: "tasks" | "team" | "dependencies") => void;
  tasksCount: number;
  teamCount: number;
  deliverablesCount: number;
}

export function WBSSidebar({ activeView, onViewChange, tasksCount, teamCount, deliverablesCount }: WBSSidebarProps) {

  const menuItems = [
    {
      id: "tasks",
      label: "Tasks & Deliverables",
      icon: "📋",
      count: tasksCount + deliverablesCount,
      active: activeView === "tasks"
    },
    {
      id: "team", 
      label: "Team",
      icon: "👥",
      count: teamCount,
      active: activeView === "team"
    },
    {
      id: "dependencies",
      label: "Dependencies",
      icon: "🔗",
      count: 0,
      active: activeView === "dependencies"
    }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Work Breakdown Structure
        </h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${item.active 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}