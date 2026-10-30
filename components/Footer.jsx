import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <Link href="/" className="footer-brand">
            বাজার দর
          </Link>
          <span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>

        <p className="footer-disclaimer">
          সকল দাম সম্ভাব্য: বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}