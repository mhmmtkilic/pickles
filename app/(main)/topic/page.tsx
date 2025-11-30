"use client";

import { TopicList } from './components/TopicList';
import { TopicFilterSidebar } from './components/TopicFilterSidebar';
import { Header } from '../discover/components/Header';
import { Navigation } from '../discover/components/Navigation';
import { PostCreator } from '../discover/components/PostCreator';
import { useState } from 'react';

export default function TopicsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onCreateClick={() => setShowCreateModal(true)} 
        isCollapsed={isNavCollapsed} 
        setIsCollapsed={setIsNavCollapsed}
        currentPage="topic-list"
        onNavigate={() => {}}
      />
      
      <div className={`transition-all duration-500 ${isNavCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          activeFilter="newest" 
          onFilterChange={() => {}}
          onProfileClick={() => {}}
        />
        
        <main className="flex items-start gap-5 p-[20px] max-w-[1800px] mx-auto">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <PostCreator onOpenModal={() => setShowCreateModal(true)} />
            <TopicList onTopicClick={(id) => console.log('Topic clicked:', id)} />
          </div>
          
          {/* Sidebar */}
          <div className="w-80 shrink-0 sticky top-[20px] self-start hidden lg:block">
            <TopicFilterSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}

