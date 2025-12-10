import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    Download,
    History,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sidebarVariants, sidebarItemText } from '@/lib/animations';
import type { PageType } from '@/App';

interface AnimatedSidebarProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
}

const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'downloads' as const, label: 'Downloads', icon: Download },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
];

export function AnimatedSidebar({ currentPage, onPageChange }: AnimatedSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.aside
            className="relative h-screen flex flex-col glass border-r border-white/5"
            variants={sidebarVariants}
            initial="expanded"
            animate={isExpanded ? 'expanded' : 'collapsed'}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-neon-purple">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <motion.div
                    variants={sidebarItemText}
                    className="overflow-hidden"
                >
                    <h1 className="font-display font-bold text-lg gradient-text whitespace-nowrap">
                        Slasshy
                    </h1>
                    <p className="text-[10px] text-muted-foreground whitespace-nowrap">
                        OmniDownloader
                    </p>
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-2">
                {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onPageChange(item.id)}
                            className={cn(
                                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                                'hover:bg-white/5 group relative overflow-hidden',
                                isActive && 'bg-primary/10 border border-primary/20'
                            )}
                        >
                            {/* Active indicator glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}

                            {/* Icon with glow effect */}
                            <div className={cn(
                                'relative z-10 p-1.5 rounded-lg transition-all duration-200',
                                isActive ? 'text-primary text-glow-sm' : 'text-muted-foreground group-hover:text-foreground'
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>

                            {/* Label */}
                            <motion.span
                                variants={sidebarItemText}
                                className={cn(
                                    'relative z-10 font-medium whitespace-nowrap',
                                    isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                )}
                            >
                                {item.label}
                            </motion.span>

                            {/* Hover highlight */}
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-colors" />
                        </button>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-white/5">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
                        'text-muted-foreground hover:text-foreground hover:bg-white/5',
                        'transition-all duration-200'
                    )}
                >
                    <div className="p-1.5 rounded-lg">
                        {isExpanded ? (
                            <ChevronLeft className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </div>
                    <motion.span
                        variants={sidebarItemText}
                        className="font-medium whitespace-nowrap"
                    >
                        Collapse
                    </motion.span>
                </button>
            </div>
        </motion.aside>
    );
}
