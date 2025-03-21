// Define the Wallpaper interface (if not imported from elsewhere)
export interface Wallpaper {
    id: string;
    url: string;
    author: string;
    title?: string;
    description?: string;
    category?: string;
    color?: string;
  }
  
  // Export the array of sample wallpapers
  export const sampleWallpapers: Wallpaper[] = [
    { 
      id: '1', 
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 
      author: 'Jane Doe', 
      title: 'Mountain Landscape', 
      description: 'A breathtaking view of the mountains at sunset, showcasing nature\'s majestic beauty.',
      category: 'Nature',
      color: '#3A7CA5'
    },
    { 
      id: '2', 
      url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5', 
      author: 'John Smith', 
      title: 'Ocean Sunset', 
      description: 'Tranquil ocean waves with vibrant sunset colors reflecting off the water surface.',
      category: 'Nature',
      color: '#F9A826'
    },
    { 
      id: '3', 
      url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce', 
      author: 'Alice Brown', 
      title: 'Misty Forest', 
      description: 'Ethereal forest shrouded in morning mist, creating a mysterious and magical atmosphere.',
      category: 'Nature',
      color: '#2D6A4F'
    },
    { 
      id: '4', 
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', 
      author: 'Bob Johnson', 
      title: 'Desert Night', 
      description: 'Starry night sky over vast desert landscape, revealing the true beauty of solitude.',
      category: 'Nature',
      color: '#212F45'
    },
    { 
      id: '5', 
      url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', 
      author: 'Carol White', 
      title: 'City Skyline', 
      description: 'Urban skyline with towering skyscrapers illuminated against the evening sky.',
      category: 'Urban',
      color: '#023E8A'
    },
    { 
      id: '6', 
      url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e', 
      author: 'David Green', 
      title: 'Mountain Lake', 
      description: 'Crystal clear mountain lake reflecting the surrounding peaks in perfect symmetry.',
      category: 'Nature',
      color: '#0077B6'
    },
    { 
      id: '7', 
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', 
      author: 'Emma Wilson', 
      title: 'Starry Mountains', 
      description: 'Majestic mountain peaks under a blanket of stars, capturing the essence of night wilderness.',
      category: 'Night',
      color: '#14213D'
    },
    { 
      id: '8', 
      url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94', 
      author: 'Frank Miller', 
      title: 'Sunrise Horizon', 
      description: 'Golden sunrise stretching across the horizon, painting the sky with vibrant colors.',
      category: 'Nature',
      color: '#FF6B35'
    },
    { 
      id: '9', 
      url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7', 
      author: 'Grace Lee', 
      title: 'Neon City Nights', 
      description: 'Vibrant neon lights reflecting off wet streets in a bustling downtown metropolis after rainfall.',
      category: 'Cyberpunk',
      color: '#9D4EDD'
    },
    { 
      id: '10', 
      url: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866', 
      author: 'Henry Clark', 
      title: 'Minimal Geometry', 
      description: 'Clean geometric patterns in soft pastel colors, perfect for a minimalist aesthetic.',
      category: 'Abstract',
      color: '#F8F9FA'
    },
    { 
      id: '11', 
      url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45', 
      author: 'Isabella Martinez', 
      title: 'Vintage Texture', 
      description: 'Weathered paper with delicate patterns creating a nostalgic, warm vintage feel.',
      category: 'Texture',
      color: '#E6CCB2'
    },
    { 
      id: '12', 
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', 
      author: 'Jack Wilson', 
      title: 'Tech Circuits', 
      description: 'Intricate circuit board patterns illuminated with blue light, representing modern technology.',
      category: 'Technology',
      color: '#0B132B'
    },
    { 
      id: '13', 
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176', 
      author: 'Katherine Young', 
      title: 'Cosmic Nebula', 
      description: 'Swirling cosmic clouds of purple and blue gas forming mesmerizing patterns in deep space.',
      category: 'Space',
      color: '#240046'
    },
    { 
      id: '14', 
      url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5', 
      author: 'Leo Thompson', 
      title: 'Gradient Flow', 
      description: 'Smooth transition of vibrant colors flowing across the screen in a modern abstract design.',
      category: 'Gradient',
      color: '#FF9E00'
    },
    { 
      id: '15', 
      url: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b', 
      author: 'Mia Garcia', 
      title: 'Dark Botanical', 
      description: 'Elegant tropical leaves against a deep black background, creating a sophisticated botanical theme.',
      category: 'Botanical',
      color: '#081C15'
    },
    { 
      id: '16', 
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7', 
      author: 'Noah Anderson', 
      title: 'Sacred Geometry', 
      description: 'Intricate mandala patterns representing the mathematical patterns found throughout nature.',
      category: 'Mandala',
      color: '#3D348B'
    },
    { 
      id: '17', 
      url: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d', 
      author: 'Olivia Walker', 
      title: 'Marble Elegance', 
      description: 'Luxurious white and gold marble texture with delicate veining for a sophisticated look.',
      category: 'Luxury',
      color: '#F5F5F5'
    },
    { 
      id: '18', 
      url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d', 
      author: 'Patrick Rodriguez', 
      title: 'Anime Landscape', 
      description: 'Stylized anime-inspired landscape with vibrant colors and fantastical elements.',
      category: 'Anime',
      color: '#FF5D8F'
    },
    { 
      id: '19', 
      url: 'https://images.unsplash.com/photo-1548504769-900b70ed122e', 
      author: 'Quinn Davis', 
      title: 'Retrofuturism', 
      description: 'Vintage vision of the future with bold colors and geometric shapes reminiscent of 80s sci-fi.',
      category: 'Retro',
      color: '#FF0080'
    },
    { 
      id: '20', 
      url: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99', 
      author: 'Rachel Kim', 
      title: 'Watercolor Dreams', 
      description: 'Delicate watercolor splashes in pastel hues creating a dreamy, artistic background.',
      category: 'Artistic',
      color: '#E0C3FC'
    },
    { 
      id: '21', 
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab', 
      author: 'Samuel Wright', 
      title: 'Streetwear Culture', 
      description: 'Urban street art with bold colors and expressive designs representing contemporary street culture.',
      category: 'Urban Art',
      color: '#D7263D'
    },
    { 
      id: '22', 
      url: 'https://images.unsplash.com/photo-1508614999368-9260051292e5', 
      author: 'Tina Nguyen', 
      title: 'Moody Ocean', 
      description: 'Dramatic dark ocean waves under stormy skies, capturing the raw power of nature.',
      category: 'Moody',
      color: '#1B263B'
    },
    { 
      id: '23', 
      url: 'https://images.unsplash.com/photo-1605512474191-81a7271771c1', 
      author: 'Ulysses Bennett', 
      title: 'Minimal Typography', 
      description: 'Clean, modern typography against a simple background for a minimalist, designer aesthetic.',
      category: 'Typography',
      color: '#FFFFFF'
    },
    { 
      id: '24', 
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', 
      author: 'Victoria Lewis', 
      title: 'Gaming Aesthetic', 
      description: 'Vibrant gaming-inspired design with neon colors and futuristic elements for tech enthusiasts.',
      category: 'Gaming',
      color: '#38AECC'
    },
    { 
      id: '25', 
      url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d', 
      author: 'William Park', 
      title: 'Film Grain', 
      description: 'Nostalgic analog film grain texture with soft colors reminiscent of vintage photography.',
      category: 'Film',
      color: '#A68A64'
    },
    { 
      id: '26', 
      url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809', 
      author: 'Xander Collins', 
      title: 'Glitch Art', 
      description: 'Digital glitch effects with distorted pixels and vibrant colors for a futuristic vaporwave aesthetic.',
      category: 'Glitch',
      color: '#7B2CBF'
    },
    { 
      id: '27', 
      url: 'https://images.unsplash.com/photo-1614851099511-773084f6911d', 
      author: 'Yasmine Patel', 
      title: 'Boho Pattern', 
      description: 'Eclectic bohemian patterns with warm earthy tones and natural textures for a free-spirited vibe.',
      category: 'Boho',
      color: '#CB997E'
    },
    { 
      id: '28', 
      url: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc', 
      author: 'Zack Taylor', 
      title: 'Architecture Lines', 
      description: 'Clean architectural lines from modern buildings creating geometric patterns against the sky.',
      category: 'Architecture',
      color: '#CAF0F8'
    },
    { 
      id: '29', 
      url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7', 
      author: 'Amelia Cooper', 
      title: 'Dark Academia', 
      description: 'Rich, moody atmosphere of old libraries and vintage academic aesthetics with classic elements.',
      category: 'Academia',
      color: '#432818'
    },
    { 
      id: '30', 
      url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91', 
      author: 'Benjamin Hall', 
      title: 'Monochrome Elegance', 
      description: 'Sophisticated black and white contrast creating a timeless, elegant aesthetic.',
      category: 'Monochrome',
      color: '#2B2D42'
    },
    { 
      id: '31', 
      url: 'https://images.unsplash.com/photo-1518022525094-218670c9b745', 
      author: 'Chloe Martin', 
      title: 'Pixel Art', 
      description: 'Nostalgic pixel art style with vibrant colors reminiscent of retro video games and digital art.',
      category: 'Pixel',
      color: '#FF6B6B'
    },
    { 
      id: '32', 
      url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9', 
      author: 'Daniel Ross', 
      title: 'Lo-fi Aesthetic', 
      description: 'Relaxed lo-fi inspired design with muted colors and nostalgic elements perfect for a chill vibe.',
      category: 'Lo-fi',
      color: '#7D6B91'
    },
    { 
      id: '33', 
      url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3', 
      author: 'Eliza James', 
      title: 'Tropical Vibes', 
      description: 'Vibrant tropical patterns with exotic flora and fauna for a summery, vacation aesthetic.',
      category: 'Tropical',
      color: '#06D6A0'
    },
    { 
      id: '34', 
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', 
      author: 'Finn Murphy', 
      title: 'Futuristic Interface', 
      description: 'High-tech user interface design with glowing elements and sleek digital aesthetics.',
      category: 'Futuristic',
      color: '#00B4D8'
    },
    { 
      id: '35', 
      url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e', 
      author: 'Gabriella Wong', 
      title: 'Streetscape', 
      description: 'Urban street view with vintage cars and atmospheric lighting capturing city nostalgia.',
      category: 'Street',
      color: '#4A5759'
    },
    { 
      id: '36', 
      url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063', 
      author: 'Harrison Ford', 
      title: 'Macro Nature', 
      description: 'Extreme close-up of natural elements revealing intricate details invisible to the naked eye.',
      category: 'Macro',
      color: '#588157'
    },
    { 
      id: '37', 
      url: 'https://images.unsplash.com/photo-1617957718597-97e8f652643f', 
      author: 'Iris Zhang', 
      title: 'Cottagecore', 
      description: 'Idyllic countryside aesthetic with wildflowers, rustic elements and warm, natural lighting.',
      category: 'Cottagecore',
      color: '#DDA15E'
    },
    { 
      id: '38', 
      url: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7', 
      author: 'Julian Carter', 
      title: 'Music Wave', 
      description: 'Abstract visualization of sound waves in vibrant colors for music lovers and audio enthusiasts.',
      category: 'Music',
      color: '#51087E'
    },
    { 
      id: '39', 
      url: 'https://images.unsplash.com/photo-1510551310160-589462dcd465', 
      author: 'Kira Evans', 
      title: 'Surreal Landscape', 
      description: 'Dreamlike landscape with impossible physics and fantastical elements defying reality.',
      category: 'Surreal',
      color: '#5E60CE'
    },
    { 
      id: '40', 
      url: 'https://images.unsplash.com/photo-1553949345-eb786d5ddac5', 
      author: 'Landon Foster', 
      title: 'Minimal Japanese', 
      description: 'Clean, minimalist Japanese-inspired design with zen elements and balanced composition.',
      category: 'Japanese',
      color: '#F5F5F5'
    }
  ];