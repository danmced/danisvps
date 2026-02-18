/*
  Letter Templates - Pre-written templates for romantic, funny, and friendship letters
  Design Philosophy: 8-bit Retro Gaming Aesthetic
*/

export interface LetterTemplate {
  id: string;
  name: string;
  nameEs: string;
  theme: "romantic" | "funny" | "friendship";
  emoji: string;
  description: string;
  descriptionEs: string;
  template: string;
  templateEs: string;
  color: string;
}

export const LETTER_TEMPLATES: LetterTemplate[] = [
  // Romantic Templates
  {
    id: "romantic-1",
    name: "Classic Romance",
    nameEs: "Romance Clásico",
    theme: "romantic",
    emoji: "💕",
    description: "A timeless romantic declaration",
    descriptionEs: "Una declaración romántica atemporal",
    template: `Dear [RECIPIENT],

Every moment with you feels like a pixel-perfect dream. Your smile brightens my world like the glow of an 8-bit sunset.

I wanted to tell you that you mean everything to me. You're my favorite adventure, my greatest treasure, and my forever player two.

Thank you for being the love of my life.

With all my heart,
[YOUR NAME]`,
    templateEs: `Querido/a [RECIPIENT],

Cada momento contigo se siente como un sueño perfecto en píxeles. Tu sonrisa ilumina mi mundo como el brillo de una puesta de sol de 8 bits.

Quería decirte que significas todo para mí. Eres mi aventura favorita, mi tesoro más grande, y mi jugador dos para siempre.

Gracias por ser el amor de mi vida.

Con todo mi corazón,
[YOUR NAME]`,
    color: "#FF6B9D",
  },
  {
    id: "romantic-2",
    name: "Poetic Love",
    nameEs: "Amor Poético",
    theme: "romantic",
    emoji: "💌",
    description: "A poetic expression of deep affection",
    descriptionEs: "Una expresión poética de profundo afecto",
    template: `My Dearest [RECIPIENT],

In the game of life, you're my winning combination. Every pixel of my heart belongs to you.

You've filled my world with colors I never knew existed. Your love is the greatest power-up I could ever receive.

I promise to love you with the intensity of a thousand retro arcade games, forever and always.

Forever yours,
[YOUR NAME]`,
    templateEs: `Mi Queridísimo/a [RECIPIENT],

En el juego de la vida, eres mi combinación ganadora. Cada píxel de mi corazón te pertenece.

Has llenado mi mundo de colores que nunca supe que existían. Tu amor es el mayor poder que podría recibir.

Te prometo amar con la intensidad de mil videojuegos retro, por siempre y para siempre.

Por siempre tuyo/a,
[YOUR NAME]`,
    color: "#E63946",
  },
  {
    id: "romantic-3",
    name: "Modern Romance",
    nameEs: "Romance Moderno",
    theme: "romantic",
    emoji: "💗",
    description: "A contemporary love letter",
    descriptionEs: "Una carta de amor contemporánea",
    template: `Hi [RECIPIENT],

I've been thinking about you non-stop. You make my heart race like a high-score chase.

Being with you feels right in a way nothing else ever has. You're my favorite person, my safe space, and my greatest joy.

I'm so grateful for every moment we share. Here's to many more adventures together.

Love always,
[YOUR NAME]`,
    templateEs: `Hola [RECIPIENT],

He estado pensando en ti sin parar. Haces que mi corazón corra como una persecución de puntuación alta.

Estar contigo se siente bien de una manera que nada más lo ha hecho. Eres mi persona favorita, mi lugar seguro, y mi mayor alegría.

Estoy tan agradecido/a por cada momento que compartimos. Por muchas más aventuras juntos.

Con amor siempre,
[YOUR NAME]`,
    color: "#FF1493",
  },

  // Funny Templates
  {
    id: "funny-1",
    name: "Gamer's Love",
    nameEs: "Amor de Jugador",
    theme: "funny",
    emoji: "🎮",
    description: "A playful gaming-themed love letter",
    descriptionEs: "Una carta de amor temática de videojuegos",
    template: `Dear [RECIPIENT],

You've unlocked a special achievement in my heart: LOVE LEVEL 99.

I'd give up all my high scores just to spend one more day with you. You're the only game I want to play forever.

Warning: This love is permanent and cannot be uninstalled.

Your devoted player one,
[YOUR NAME]`,
    templateEs: `Querido/a [RECIPIENT],

Has desbloqueado un logro especial en mi corazón: NIVEL DE AMOR 99.

Renunciaría a todas mis puntuaciones altas solo para pasar un día más contigo. Eres el único juego que quiero jugar para siempre.

Advertencia: Este amor es permanente y no se puede desinstalar.

Tu jugador uno dedicado,
[YOUR NAME]`,
    color: "#FFD700",
  },
  {
    id: "funny-2",
    name: "Cheesy Pickup Lines",
    nameEs: "Líneas de Conquista Cursi",
    theme: "funny",
    emoji: "😄",
    description: "Hilariously corny Valentine's message",
    descriptionEs: "Un mensaje de San Valentín hilarantemente cursi",
    template: `Hey [RECIPIENT],

Are you a pixel? Because you're absolutely perfect to me.

I'd swipe right on you every single day. You're the only match I need.

Fair warning: I'm terrible at flirting, but I'm excellent at loving you. So let's skip the awkward part and just be together forever?

Awkwardly yours,
[YOUR NAME]`,
    templateEs: `Hola [RECIPIENT],

¿Eres un píxel? Porque eres absolutamente perfecto/a para mí.

Te daría un desliz hacia la derecha todos los días. Eres el único partido que necesito.

Advertencia justa: Soy terrible coqueteando, pero soy excelente amándote. ¿Entonces saltamos la parte incómoda y estamos juntos para siempre?

Incómodamente tuyo/a,
[YOUR NAME]`,
    color: "#FFB347",
  },
  {
    id: "funny-3",
    name: "Meme Energy",
    nameEs: "Energía de Meme",
    theme: "funny",
    emoji: "😂",
    description: "A funny, relatable love message",
    descriptionEs: "Un mensaje de amor divertido y relatable",
    template: `[RECIPIENT],

You know that feeling when you find the perfect meme? That's how I feel about you.

You're my favorite notification, my best notification, and honestly my only notification that matters.

Thanks for being my ride or die. I promise to laugh at your jokes (even the bad ones).

Your meme partner for life,
[YOUR NAME]`,
    templateEs: `[RECIPIENT],

¿Sabes esa sensación cuando encuentras el meme perfecto? Así es como me siento contigo.

Eres mi notificación favorita, mi mejor notificación, y honestamente mi única notificación que importa.

Gracias por ser mi compañero/a de viaje. Te prometo reír de tus bromas (incluso las malas).

Tu compañero/a de memes de por vida,
[YOUR NAME]`,
    color: "#00CED1",
  },

  // Friendship Templates
  {
    id: "friendship-1",
    name: "Best Friend Forever",
    nameEs: "Mejor Amigo/a Para Siempre",
    theme: "friendship",
    emoji: "👯",
    description: "A heartfelt friendship appreciation",
    descriptionEs: "Una apreciación sincera de la amistad",
    template: `Dear [RECIPIENT],

I wanted to take a moment to tell you how much your friendship means to me. You're not just my friend—you're my family.

You've been there for me through every level of life, celebrating my wins and supporting me through the tough times.

Thank you for being the most amazing friend anyone could ask for. I'm so lucky to have you in my life.

Forever grateful,
[YOUR NAME]`,
    templateEs: `Querido/a [RECIPIENT],

Quería tomarme un momento para decirte cuánto significa tu amistad para mí. No eres solo mi amigo/a, eres mi familia.

Has estado conmigo en cada nivel de la vida, celebrando mis victorias y apoyándome en los momentos difíciles.

Gracias por ser el amigo/a más increíble que alguien podría pedir. Tengo tanta suerte de tenerte en mi vida.

Eternamente agradecido/a,
[YOUR NAME]`,
    color: "#9370DB",
  },
  {
    id: "friendship-2",
    name: "Partner in Crime",
    nameEs: "Cómplice",
    theme: "friendship",
    emoji: "🤝",
    description: "A fun friendship celebration",
    descriptionEs: "Una celebración divertida de la amistad",
    template: `[RECIPIENT],

You're my favorite person to get into trouble with. Life is infinitely better when you're around.

We've had so many amazing adventures together, and I can't wait for all the ones still to come.

Thanks for being my partner in crime, my shoulder to cry on, and my biggest cheerleader.

Your ride or die,
[YOUR NAME]`,
    templateEs: `[RECIPIENT],

Eres mi persona favorita para meterse en problemas. La vida es infinitamente mejor cuando estás cerca.

Hemos tenido tantas aventuras increíbles juntos, y no puedo esperar por todas las que están por venir.

Gracias por ser mi cómplice, mi hombro para llorar, y mi mayor animador/a.

Tu compañero/a de viaje,
[YOUR NAME]`,
    color: "#20B2AA",
  },
  {
    id: "friendship-3",
    name: "Grateful Friend",
    nameEs: "Amigo/a Agradecido/a",
    theme: "friendship",
    emoji: "🌟",
    description: "An expression of deep friendship gratitude",
    descriptionEs: "Una expresión de profunda gratitud de amistad",
    template: `My Dear Friend [RECIPIENT],

I don't say it enough, but I want you to know how much you mean to me. You're one of the best things that ever happened to me.

Your kindness, humor, and loyalty inspire me every single day. I'm so grateful to call you my friend.

Here's to a lifetime of memories, laughter, and unconditional friendship.

With love and appreciation,
[YOUR NAME]`,
    templateEs: `Mi Querido/a Amigo/a [RECIPIENT],

No lo digo lo suficiente, pero quiero que sepas cuánto significas para mí. Eres una de las mejores cosas que me han pasado.

Tu amabilidad, humor y lealtad me inspiran cada día. Estoy tan agradecido/a de poder llamarte mi amigo/a.

Por una vida llena de recuerdos, risas, y amistad incondicional.

Con amor y apreciación,
[YOUR NAME]`,
    color: "#FFD700",
  },
];

// Get templates by theme
export const getTemplatesByTheme = (theme: "romantic" | "funny" | "friendship") => {
  return LETTER_TEMPLATES.filter((template) => template.theme === theme);
};

// Get all themes
export const getAllThemes = () => {
  return ["romantic", "funny", "friendship"] as const;
};

// Get theme info
export const getThemeInfo = (theme: string, language: string = "en") => {
  const themeMap: Record<string, { emoji: string; label: string; description: string }> = {
    romantic: {
      emoji: "💕",
      label: language === "es" ? "Romántico" : "Romantic",
      description: language === "es" ? "Expresa tu amor y afecto" : "Express your love and affection",
    },
    funny: {
      emoji: "😄",
      label: language === "es" ? "Divertido" : "Funny",
      description: language === "es" ? "Hazlos reír con humor" : "Make them laugh with humor",
    },
    friendship: {
      emoji: "👯",
      label: language === "es" ? "Amistad" : "Friendship",
      description: language === "es" ? "Celebra tu amistad" : "Celebrate your friendship",
    },
  };

  return themeMap[theme] || themeMap.romantic;
};
