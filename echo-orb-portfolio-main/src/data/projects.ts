export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "network-protocol-simulator",
    title: "Network Protocol Simulator",
    description: "Interactive TCP/UDP packet visualization with real-time flow analysis",
    longDescription: "A comprehensive network protocol simulator that visualizes TCP/UDP packet transmission, congestion control algorithms, and network flow dynamics. Features real-time packet tracing, RTT calculations, and interactive protocol state machine diagrams. Built to help students and professionals understand network fundamentals through visual learning.",
    techStack: ["Python", "React", "D3.js", "WebSocket", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "Systems"
  },
  {
    id: "face-recognition-dashboard",
    title: "Face Recognition Auth",
    description: "ML-powered biometric authentication dashboard with liveness detection",
    longDescription: "Enterprise-grade facial recognition authentication system featuring deep learning-based face detection, anti-spoofing liveness checks, and secure token-based session management. Includes admin dashboard for user management, audit logs, and real-time monitoring of authentication attempts.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    category: "Machine Learning"
  },
  {
    id: "flutter-rag-assistant",
    title: "Flutter RAG AI Assistant",
    description: "Mobile AI chatbot with retrieval-augmented generation for documents",
    longDescription: "A sophisticated mobile AI assistant built with Flutter, featuring RAG (Retrieval-Augmented Generation) for context-aware responses. Users can upload documents, and the AI provides accurate answers grounded in the uploaded content. Includes voice input, markdown rendering, and offline caching.",
    techStack: ["Flutter", "Dart", "LangChain", "Pinecone", "Firebase"],
    githubUrl: "https://github.com",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile"
  },
  {
    id: "realtime-collaborative-editor",
    title: "Real-time Collaborative Editor",
    description: "Google Docs-like editor with CRDT-based conflict resolution",
    longDescription: "A real-time collaborative text editor implementing Conflict-free Replicated Data Types (CRDTs) for seamless multi-user editing. Features include cursor presence, version history, comments, and offline support with automatic sync. Handles concurrent edits without conflicts or data loss.",
    techStack: ["TypeScript", "Yjs", "WebSocket", "React", "Redis"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    category: "Web"
  },
  {
    id: "distributed-task-scheduler",
    title: "Distributed Task Scheduler",
    description: "Fault-tolerant job scheduler with leader election and load balancing",
    longDescription: "A distributed task scheduling system designed for reliability and scalability. Implements Raft consensus for leader election, consistent hashing for load distribution, and persistent job queues for fault tolerance. Includes a web dashboard for monitoring task execution, worker health, and system metrics.",
    techStack: ["Go", "gRPC", "etcd", "Prometheus", "Kubernetes"],
    githubUrl: "https://github.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Systems"
  },
  {
    id: "data-pipeline-visualizer",
    title: "Data Pipeline Visualizer",
    description: "ETL monitoring tool with DAG visualization and anomaly detection",
    longDescription: "An intuitive data pipeline monitoring and visualization platform. Features interactive DAG (Directed Acyclic Graph) views of data flows, real-time execution tracking, SLA monitoring, and ML-based anomaly detection for data quality issues. Integrates with popular orchestrators like Airflow and Prefect.",
    techStack: ["Python", "Apache Kafka", "Spark", "React", "ClickHouse"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Data Engineering"
  }
];
