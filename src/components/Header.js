// src/components/Header.js
import Link from 'next/link';
import styles from '../styles/global.css';

const Header = () => (
  <header>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </header>
);

export default Header;
