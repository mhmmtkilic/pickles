import { X, Image, Link2, Smile, Tag, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const POST_TYPES = [
  { id: 'discussion', label: 'Tartışma', emoji: '💬', description: 'Genel sohbet ve tartışma' },
  { id: 'question', label: 'Soru', emoji: '❓', description: 'Topluluktan yardım iste' },
  { id: 'poll', label: 'Anket', emoji: '📊', description: 'Oy toplayıp görüş al' },
  { id: 'announcement', label: 'Duyuru', emoji: '📢', description: 'Önemli bilgi paylaş' },
  { id: 'sharing', label: 'Paylaşım', emoji: '🎉', description: 'Başarı veya içerik paylaş' },
];

const CATEGORIES = [
  { 
    id: 'tech', 
    label: 'Teknoloji',
    subcategories: ['Yazılım', 'Donanım', 'Mobil', 'Web', 'AI/ML']
  },
  { 
    id: 'design', 
    label: 'Tasarım',
    subcategories: ['UI/UX', 'Grafik Tasarım', 'Ürün Tasarımı', '3D Modelleme']
  },
  { 
    id: 'lifestyle', 
    label: 'Yaşam',
    subcategories: ['Sağlık', 'Spor', 'Yemek', 'Seyahat', 'Hobi']
  },
  { 
    id: 'education', 
    label: 'Eğitim',
    subcategories: ['Üniversite', 'Online Kurslar', 'Kariyer', 'Sınavlar']
  },
  { 
    id: 'entertainment', 
    label: 'Eğlence',
    subcategories: ['Müzik', 'Film/Dizi', 'Oyun', 'Kitap']
  },
];

const AVAILABLE_TAGS = [
  'Teknoloji', 'Yazılım', 'Tasarım', 'Oyun', 'Müzik', 'Spor',
  'Sanat', 'Bilim', 'Eğitim', 'Sağlık', 'Girişimcilik', 'Kariyer',
];

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [selectedPostType, setSelectedPostType] = useState('discussion');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTagArea, setShowTagArea] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    // Post paylaşma işlemi burada yapılacak
    console.log({
      type: selectedPostType,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      tags: selectedTags,
      title,
      content,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl">Yeni Gönderi Oluştur</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm mb-3">Gönderi Tipi</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {POST_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedPostType(type.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedPostType === type.id
                      ? 'border-accent bg-violet-50'
                      : 'border-border hover:border-violet-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.emoji}</div>
                  <div className="text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Kategori</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                  }}
                  className="w-full px-4 py-2.5 pr-10 border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                >
                  <option value="">Kategori Seç</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Alt Kategori</label>
              <div className="relative">
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  disabled={!selectedCategory}
                  className="w-full px-4 py-2.5 pr-10 border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent disabled:bg-secondary disabled:cursor-not-allowed"
                >
                  <option value="">Alt Kategori Seç</option>
                  {currentCategory?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm mb-2">Başlık</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Gönderin başlığını yazın..."
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm mb-2">İçerik</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Aklından ne geçiyor?"
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm">Taglar</label>
              <span className="text-xs text-muted-foreground">
                {selectedTags.length}/5
              </span>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 text-accent rounded-md border border-violet-100"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-violet-100 rounded-sm transition-colors p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Selection Button */}
            <button
              onClick={() => setShowTagArea(!showTagArea)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm"
            >
              <Tag className="w-4 h-4" />
              <span>Tag Ekle</span>
            </button>

            {/* Tag Selection Area */}
            {showTagArea && (
              <div className="mt-3 p-4 bg-secondary rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  En fazla 5 tag seçebilirsin
                </p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-violet-50 text-accent border border-violet-200'
                          : 'bg-white border border-border hover:border-violet-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Media Buttons */}
          <div>
            <label className="block text-sm mb-2">Medya</label>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm">
                <Image className="w-4 h-4" />
                <span>Fotoğraf</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm">
                <Link2 className="w-4 h-4" />
                <span>Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg hover:bg-secondary transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !content || !selectedCategory}
            className="px-6 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}
