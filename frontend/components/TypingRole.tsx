'use client';
import { useEffect, useState } from 'react';

const ROLES = [
  'Full-Stack Software Engineer'
];

export default function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause at end before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <p className="hero-role">
      {displayed}
      <span className="typing-cursor">|</span>
    </p>
  );
}
