import React from 'react';
import { Users, DollarSign, UserPlus, ArrowUpRight } from 'lucide-react';

export default function StatsGrid({ stats, loading }) {
  const cards = [
    {
      title: 'Active Members',
      value: stats.activeMembers ? stats.activeMembers.toLocaleString() : '0',
      change: '+14% from last month',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      lightColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
      title: 'Monthly Revenue',
      value: stats.revenue ? `$${stats.revenue.toLocaleString()}` : '$0',
      change: '+8.2% from last month',
      icon: DollarSign,
      color: 'from-emerald-600 to-teal-600',
      lightColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
    },
    {
      title: 'Signups Today',
      value: stats.signupsToday ? stats.signupsToday.toLocaleString() : '0',
      change: '+21% vs yesterday',
      icon: UserPlus,
      color: 'from-violet-600 to-fuchsia-600',
      lightColor: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30',
      badgeColor: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={idx} 
            className="relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
          >
            {/* Top gradient glowing border */}
            <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${card.color}`} />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                {card.title}
              </span>
              <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${card.lightColor}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>

            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                  {card.value}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className={`flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${card.badgeColor}`}>
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />
                    {card.change.split(' ')[0]}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                    {card.change.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
