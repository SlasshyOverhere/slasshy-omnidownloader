import { motion } from 'framer-motion';
import { floatAnimation } from '@/lib/animations';

interface GlowOrbProps {
    color: 'purple' | 'cyan' | 'pink';
    size: 'sm' | 'md' | 'lg';
    position: { x: string; y: string };
    delay?: number;
}

const colorMap = {
    purple: 'from-purple-500/30 to-violet-600/20',
    cyan: 'from-cyan-400/30 to-blue-500/20',
    pink: 'from-pink-500/30 to-rose-600/20',
};

const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
};

const blurMap = {
    sm: 'blur-2xl',
    md: 'blur-3xl',
    lg: 'blur-[100px]',
};

function GlowOrb({ color, size, position, delay = 0 }: GlowOrbProps) {
    return (
        <motion.div
            className={`absolute rounded-full bg-gradient-to-br ${colorMap[color]} ${sizeMap[size]} ${blurMap[size]}`}
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
            }}
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay }}
        />
    );
}

export function GlowOrbs() {
    return (
        <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
            {/* Large background orbs */}
            <GlowOrb color="purple" size="lg" position={{ x: '20%', y: '30%' }} delay={0} />
            <GlowOrb color="cyan" size="lg" position={{ x: '80%', y: '60%' }} delay={2} />
            <GlowOrb color="pink" size="md" position={{ x: '60%', y: '20%' }} delay={1} />

            {/* Smaller accent orbs */}
            <GlowOrb color="purple" size="sm" position={{ x: '10%', y: '70%' }} delay={3} />
            <GlowOrb color="cyan" size="sm" position={{ x: '90%', y: '20%' }} delay={1.5} />
            <GlowOrb color="pink" size="sm" position={{ x: '40%', y: '85%' }} delay={2.5} />
        </div>
    );
}
