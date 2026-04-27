import React from 'react';

// Subcategory → { emoji, gradient, accent }
const SUBCATEGORY_STYLES = {
  // Furniture
  'Sofas':        { emoji: '🛋️', bg: 'linear-gradient(135deg,#F3E5D0,#E8C99A)', accent: '#C4A265' },
  'Chairs':       { emoji: '🪑', bg: 'linear-gradient(135deg,#EDE0D0,#D9C4A8)', accent: '#A0845C' },
  'Coffee Tables':{ emoji: '🪵', bg: 'linear-gradient(135deg,#E8DDD0,#D4C4B0)', accent: '#9C8060' },
  'Beds':         { emoji: '🛏️', bg: 'linear-gradient(135deg,#EDE8E0,#D8D0C4)', accent: '#8C7C6C' },
  'Desks':        { emoji: '🖥️', bg: 'linear-gradient(135deg,#E0EAF4,#C8D8EC)', accent: '#6090B8' },
  'Bookshelves':  { emoji: '📚', bg: 'linear-gradient(135deg,#F0E8D0,#E0D0B0)', accent: '#A08040' },
  'Dining Sets':  { emoji: '🍽️', bg: 'linear-gradient(135deg,#F4EDE0,#E8D8C0)', accent: '#B09060' },
  'Lamps':        { emoji: '💡', bg: 'linear-gradient(135deg,#FFFBEC,#FFF0B0)', accent: '#D4A800' },
  'Vases':        { emoji: '🏺', bg: 'linear-gradient(135deg,#F0ECE4,#E0D8CC)', accent: '#9C8870' },
  'Mirrors':      { emoji: '🪞', bg: 'linear-gradient(135deg,#E8F0F4,#D0E0EC)', accent: '#6090A8' },
  'Rugs':         { emoji: '🟫', bg: 'linear-gradient(135deg,#EEE0D0,#DDC8B0)', accent: '#A07850' },
  'Wall Art':     { emoji: '🖼️', bg: 'linear-gradient(135deg,#F4F0E8,#E8E0D0)', accent: '#8878A0' },
  'Coffee Makers':{ emoji: '☕', bg: 'linear-gradient(135deg,#3D2B1F,#5C3D2E)', accent: '#FF8C42', textColor: '#fff' },
  'Cookware':     { emoji: '🍳', bg: 'linear-gradient(135deg,#E8EDEE,#D0D8DC)', accent: '#5A7A8A' },
  'Home Office':  { emoji: '🖥️', bg: 'linear-gradient(135deg,#E8F0F8,#D0E0F0)', accent: '#4070A0' },

  // Electronics
  'TVs':               { emoji: '📺', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', accent: '#00D4FF', textColor: '#fff' },
  'Smart Speakers':    { emoji: '🔊', bg: 'linear-gradient(135deg,#1C1C2E,#2A2A3E)', accent: '#7B5EA7', textColor: '#fff' },
  'Computer Monitors': { emoji: '🖥️', bg: 'linear-gradient(135deg,#1A2035,#2A3050)', accent: '#4FC3F7', textColor: '#fff' },
  'Gaming Consoles':   { emoji: '🎮', bg: 'linear-gradient(135deg,#1A1A1A,#2D1B3D)', accent: '#9B59B6', textColor: '#fff' },
  'Air Purifiers':     { emoji: '💨', bg: 'linear-gradient(135deg,#E8F8FF,#C8EEFF)', accent: '#0088CC' },
  'Heaters':           { emoji: '🔥', bg: 'linear-gradient(135deg,#FFF0E0,#FFD8B0)', accent: '#FF6600' },
  'Vacuum Cleaners':   { emoji: '🌀', bg: 'linear-gradient(135deg,#EEF2F8,#DCE4F4)', accent: '#2244CC' },
  'Air Conditioners':  { emoji: '❄️', bg: 'linear-gradient(135deg,#E0F4FF,#B8E4FF)', accent: '#0066BB' },

  // Fashion
  'Sunglasses':     { emoji: '🕶️', bg: 'linear-gradient(135deg,#1A1A1A,#333344)', accent: '#FFD700', textColor: '#fff' },
  'Eyeglasses':     { emoji: '👓', bg: 'linear-gradient(135deg,#F0F4FF,#E0E8FF)', accent: '#4455CC' },
  'Computer Glasses':{ emoji: '🥽', bg: 'linear-gradient(135deg,#EEF8F0,#D8F0E0)', accent: '#44AA66' },
  'Sports Goggles': { emoji: '🥽', bg: 'linear-gradient(135deg,#FF6600,#FF9900)', accent: '#fff', textColor: '#fff' },
  'Sneakers':       { emoji: '👟', bg: 'linear-gradient(135deg,#F8F0FF,#EDE0FF)', accent: '#8844CC' },
  'Athletic Shoes': { emoji: '🏃', bg: 'linear-gradient(135deg,#FFF4E0,#FFE8C0)', accent: '#CC7700' },
  'Sandals':        { emoji: '👡', bg: 'linear-gradient(135deg,#FFF8F0,#FFEDD8)', accent: '#CC8844' },
  'Boots':          { emoji: '🥾', bg: 'linear-gradient(135deg,#3D2B1F,#5C3D2E)', accent: '#D4A85A', textColor: '#fff' },
  'Formal Shoes':   { emoji: '👞', bg: 'linear-gradient(135deg,#2A1F18,#3D2D24)', accent: '#C4A06A', textColor: '#fff' },

  // Toys
  'Action Figures':       { emoji: '🦸', bg: 'linear-gradient(135deg,#FF4444,#CC0000)', accent: '#FFDD00', textColor: '#fff' },
  'Building Sets':        { emoji: '🧱', bg: 'linear-gradient(135deg,#FFCC00,#FF9900)', accent: '#CC3300', textColor: '#1A1A1A' },
  'Dolls':               { emoji: '🪆', bg: 'linear-gradient(135deg,#FFB8D0,#FF88B0)', accent: '#CC3366' },
  'Board Games':         { emoji: '🎲', bg: 'linear-gradient(135deg,#1A4A1A,#2A7A2A)', accent: '#FFD700', textColor: '#fff' },
  'Puzzles':             { emoji: '🧩', bg: 'linear-gradient(135deg,#4488CC,#2266AA)', accent: '#FFB800', textColor: '#fff' },
  'Active Games':        { emoji: '🎯', bg: 'linear-gradient(135deg,#FF6600,#CC3300)', accent: '#FFFF00', textColor: '#fff' },
  'Video Game Accessories':{ emoji: '🕹️', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', accent: '#00FF88', textColor: '#fff' },

  // Other
  'Exercise Bikes':  { emoji: '🚴', bg: 'linear-gradient(135deg,#FF6600,#CC4400)', accent: '#fff', textColor: '#fff' },
  'Yoga Mats':       { emoji: '🧘', bg: 'linear-gradient(135deg,#44BB88,#228866)', accent: '#fff', textColor: '#fff' },
  'Dumbbells':       { emoji: '🏋️', bg: 'linear-gradient(135deg,#2A2A2A,#444444)', accent: '#FF6600', textColor: '#fff' },
  'Treadmills':      { emoji: '🏃', bg: 'linear-gradient(135deg,#1A3A5A,#2A5A8A)', accent: '#44CCFF', textColor: '#fff' },
  'Pet Beds':        { emoji: '🐾', bg: 'linear-gradient(135deg,#F8EDD8,#EED8B8)', accent: '#AA7744' },
  'Cages':           { emoji: '🐦', bg: 'linear-gradient(135deg,#E8F4E8,#C8E4C8)', accent: '#448844' },
  'Pet Furniture':   { emoji: '🐱', bg: 'linear-gradient(135deg,#FFF0E0,#FFDDC0)', accent: '#CC6600' },
  'Seat Covers':     { emoji: '🚗', bg: 'linear-gradient(135deg,#1A2A3A,#2A3A4A)', accent: '#4488FF', textColor: '#fff' },
  'Dash Cams':       { emoji: '📷', bg: 'linear-gradient(135deg,#1A1A1A,#333333)', accent: '#FF4444', textColor: '#fff' },
  'Paintings':       { emoji: '🎨', bg: 'linear-gradient(135deg,#F8F0E8,#EEE0D0)', accent: '#8844AA' },
  'Sculptures':      { emoji: '🗿', bg: 'linear-gradient(135deg,#C8B8A8,#B8A898)', accent: '#6A5A4A' },
};

// Fallback per main category
const CATEGORY_FALLBACK = {
  furniture:   { emoji: '🛋️', bg: 'linear-gradient(135deg,#F3E5D0,#E8C99A)', accent: '#C4A265' },
  electronics: { emoji: '📺', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', accent: '#00D4FF', textColor: '#fff' },
  fashion:     { emoji: '👗', bg: 'linear-gradient(135deg,#F8E0F0,#F0C8E8)', accent: '#CC44AA' },
  toys:        { emoji: '🎮', bg: 'linear-gradient(135deg,#FF4444,#CC0000)', accent: '#FFD700', textColor: '#fff' },
  other:       { emoji: '🌟', bg: 'linear-gradient(135deg,#2A4A2A,#3A6A3A)', accent: '#88FF88', textColor: '#fff' },
};

export default function ImageWithFallback({ product, style = {}, className = '' }) {
  const style_obj = SUBCATEGORY_STYLES[product.subcategory] || CATEGORY_FALLBACK[product.category] || { emoji: '📦', bg: 'linear-gradient(135deg,#eee,#ddd)', accent: '#888' };
  const textColor = style_obj.textColor || '#1A1A1A';

  return (
    <div className={className} style={{
      background: style_obj.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 8, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -30, right: -30 }} />
      <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', bottom: -20, left: -20 }} />

      {/* Main emoji */}
      <div style={{ fontSize: 56, lineHeight: 1, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
        {style_obj.emoji}
      </div>

      {/* Subcategory label */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(4px)',
        borderRadius: 20, padding: '3px 10px',
        fontSize: 10, fontWeight: 700, color: textColor,
        letterSpacing: 0.5, opacity: 0.85,
      }}>
        {product.subcategory || product.category}
      </div>
    </div>
  );
}
