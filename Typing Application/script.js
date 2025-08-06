const TIME_LIMIT = 30;
const paragraphs = [
  "Technology has changed the way we live, communicate, and interact with the world. From smartphones to smart homes, innovations are constantly evolving to make our lives easier and more connected. Whether it’s using GPS to navigate unfamiliar roads or accessing information instantly via the internet, we rely heavily on technology every day. As these tools become more intelligent and integrated, it’s important to balance convenience with privacy, and ensure that we use these advancements responsibly.",
  
  "In a small village nestled between two mountains, the community lived in harmony with nature. Children played by the riverbanks, elders shared stories under the banyan tree, and farmers worked together in the fields. Life was simple, yet full of meaning. The village thrived on unity, trust, and tradition. Every evening, the scent of home-cooked meals would drift through the narrow streets, reminding everyone of the importance of family and togetherness.",
  
  "Learning to code is like learning a new language. At first, the syntax and logic may seem confusing, but with consistent practice, it becomes second nature. Programming encourages problem-solving, logical thinking, and creativity. Whether you're developing a game, building a website, or analyzing data, coding empowers you to bring your ideas to life. As technology advances, coding is becoming one of the most valuable skills across industries.",
  
  "The universe is vast and filled with mysteries waiting to be discovered. From the smallest particles to the largest galaxies, scientists have only scratched the surface of understanding what lies beyond our planet. Space exploration has not only deepened our knowledge but also inspired generations to dream big and reach for the stars. Telescopes, satellites, and rovers have given us glimpses of distant planets and stars, expanding our perspective on life and existence.",
  
  "Effective communication is the foundation of strong relationships, both personal and professional. It involves not just speaking clearly, but also listening actively and responding empathetically. Whether in a team setting or one-on-one conversation, being able to express your thoughts and understand others can lead to better collaboration, fewer conflicts, and greater mutual respect. In today’s digital age, strong communication skills are more important than ever.",
  
  "Time management is a crucial skill for success in both academic and professional life. It involves setting priorities, avoiding procrastination, and maintaining a balance between work and rest. People who manage their time effectively are able to meet deadlines, reduce stress, and achieve more in less time. Tools like calendars, to-do lists, and time-tracking apps can help individuals stay organized and focused on their goals.",
  
  "Climate change is one of the biggest challenges facing our world today. Rising temperatures, melting glaciers, and extreme weather events are just some of the consequences we are beginning to witness. Scientists and environmentalists emphasize the importance of reducing carbon emissions, shifting to renewable energy, and protecting natural habitats. Each individual has a role to play in creating a sustainable future for the generations to come.",
  
  "Books have the power to transport us to different worlds, introduce us to new ideas, and broaden our perspectives. Whether it's a thrilling mystery, a historical drama, or a scientific explanation, reading nurtures the mind and feeds the imagination. In an age of fast content and short attention spans, taking time to read a book is a valuable habit that fosters patience, comprehension, and critical thinking.",
  
  "Physical exercise is not only beneficial for the body but also for the mind. Regular activity helps in maintaining a healthy weight, strengthening the heart, and improving flexibility. Mentally, it boosts mood, reduces anxiety, and enhances cognitive functions. Whether it’s walking, dancing, or lifting weights, finding a form of exercise you enjoy can significantly improve your quality of life.",
  
  "Teamwork is essential in almost every area of life, from school projects to professional environments. Working well in a team requires cooperation, trust, and the ability to resolve conflicts constructively. A successful team values each member’s contribution and supports one another in achieving common goals. When people work together effectively, they can achieve much more than any individual working alone."
];

const paragraphEl = document.getElementById("paragraph");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let timer;
let timeRemaining = TIME_LIMIT;
let isTyping = false;
let currentText = "";
let lastIndex = -1;

function loadParagraph() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * paragraphs.length);
  } while (randomIndex === lastIndex); // Avoid repeat

  lastIndex = randomIndex;
  currentText = paragraphs[randomIndex];
  paragraphEl.textContent = currentText;
}

function startTimer() {
  timerEl.textContent = timeRemaining;
  timer = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = `Time Left : ` + timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      inputEl.disabled = true;
      showResult();
    }
  }, 1000);
}

inputEl.addEventListener("input", () => {
  if (!isTyping) {
    isTyping = true;
    startTimer();
  }

  if (inputEl.value.length >= currentText.length || timeRemaining <= 0) {
    clearInterval(timer);
    inputEl.disabled = true;
    showResult();
  }
});

function showResult() {
  const typedText = inputEl.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(word => word !== "").length;
  const timeTaken = TIME_LIMIT - timeRemaining;
  const minutes = timeTaken / 60;
  const wpm = Math.round(wordsTyped / minutes || 0);

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / typedText.length) * 100 || 0);

  wpmEl.textContent = `WPM: `+ wpm;
  accuracyEl.textContent = `Accuracy: `+accuracy;
}

function resetTest() {
  clearInterval(timer);
  timeRemaining = TIME_LIMIT;
  isTyping = false;
  inputEl.disabled = false;
  inputEl.value = "";
  timerEl.textContent = `Time Left :  `+ TIME_LIMIT;
  wpmEl.textContent = `WPM: 0`;
  accuracyEl.textContent = `Acuuracy: 0%`;
  loadParagraph();
}

window.onload = () => {
  loadParagraph();
};
