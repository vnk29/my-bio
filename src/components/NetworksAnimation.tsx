import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// TCP/IP Handshake Animation
const TCPHandshakeAnimation = () => {
  const nodes = [
    { id: 'client', label: 'Client', x: 20, y: 50 },
    { id: 'server', label: 'Server', x: 80, y: 50 },
  ];

  const packets = [
    { id: 1, label: 'SYN', from: 'client', to: 'server', delay: 0 },
    { id: 2, label: 'SYN-ACK', from: 'server', to: 'client', delay: 0.8 },
    { id: 3, label: 'ACK', from: 'client', to: 'server', delay: 1.6 },
  ];

  return (
    <div className="w-full h-64 bg-background/50 rounded-lg border border-border/50 overflow-hidden flex items-center justify-center relative">
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0)" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {packets.map((packet) => (
          <motion.line
            key={`line-${packet.id}`}
            x1="20%"
            y1="50%"
            x2="80%"
            y2="50%"
            stroke="url(#flow)"
            strokeWidth="2"
            opacity="0.3"
            strokeDasharray="100"
            animate={{
              strokeDashoffset: [0, -100],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: packet.delay,
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center"
          style={{ left: node.x + '%', top: node.y + '%' }}
        >
          <motion.div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-primary flex items-center justify-center">
              <span className="text-xs font-bold text-black">{node.label === 'Client' ? 'PC' : 'SV'}</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <span className="text-xs font-semibold mt-2 text-gray-300">{node.label}</span>
        </motion.div>
      ))}

      {/* Floating packets */}
      {packets.map((packet) => {
        const isReverse = packet.from === 'server';
        return (
          <motion.div
            key={`packet-${packet.id}`}
            className="absolute"
            initial={{
              x: isReverse ? '80%' : '20%',
              y: '50%',
            }}
            animate={{
              x: isReverse ? '20%' : '80%',
              y: '50%',
            }}
            transition={{
              duration: 0.8,
              delay: packet.delay,
              repeat: Infinity,
              repeatDelay: 2.4,
            }}
          >
            <div className="relative">
              <motion.div className="px-3 py-1 rounded-full bg-primary/20 border border-primary text-xs font-bold text-primary">
                {packet.label}
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full border border-primary"
                animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Stage label */}
      <motion.div className="absolute bottom-4 left-4 text-xs text-gray-400">
        <span>TCP 3-Way Handshake Visualization</span>
      </motion.div>
    </div>
  );
};

// Data flow animation for networks project
const DataFlowAnimation = () => {
  const dataPoints = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    delay: i * 0.2,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          TCP/IP Handshake
        </h4>
        <TCPHandshakeAnimation />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col justify-center"
      >
        <h4 className="font-bold mb-4 text-lg">Key Concepts</h4>
        <div className="space-y-3">
          {[
            { label: 'SYN', desc: 'Client initiates connection' },
            { label: 'SYN-ACK', desc: 'Server acknowledges' },
            { label: 'ACK', desc: 'Connection established' },
            { label: 'Data Transfer', desc: 'Bidirectional communication' },
            { label: 'FIN', desc: 'Connection closure' },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
              whileHover={{ x: 8 }}
            >
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                {item.label}
              </span>
              <span className="text-sm text-gray-300">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { TCPHandshakeAnimation, DataFlowAnimation };
