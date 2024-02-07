import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to show the next topic
function showNextTopic(topicNumber) {
  // Hide all topics and the iframe
  hideAllTopics();

  // Show the selected topic
  let topicElement = document.getElementById('topic' + topicNumber);
  if (topicElement) {
    topicElement.classList.remove('c_chapcourse_hidden');
  }
}

// Function to hide all topics
function hideAllTopics() {
  for (let i = 0; i <= 2; i++) {
    let topicElement = document.getElementById('topic' + i);
    if (topicElement) {
      topicElement.classList.add('hidden');
    }
  }

  let iframeElement = document.getElementById('iframe');
  if (iframeElement) {
    iframeElement.classList.add('hidden');
  }
}

// Function to enroll and disable the button
function enroll(modalNumber) {
  let enrollButton = document.getElementById(`enrollButton${modalNumber}`);
  if (enrollButton) {
    enrollButton.disabled = true;
    enrollButton.innerText = `You are now enrolled.`;
  }
}

// Function to redirect to Google
function redirectToGoogle() {
  window.location.href = 'https://www.google.com';
}

const useToggleChoices = (initialChoices) => {
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleToggle = (choice) => {
    setSelectedChoice(choice === selectedChoice ? '' : choice);
  };

  return {
    selectedChoice,
    handleToggle,
    choices: initialChoices.map((choice) => choice.charAt(0).toUpperCase() + choice.slice(1)),
  };
};




// Exporting all functions and hooks
export { showNextTopic, hideAllTopics, enroll, redirectToGoogle, useToggleChoices };
