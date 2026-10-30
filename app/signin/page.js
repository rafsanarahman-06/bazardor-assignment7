"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SigninPage() {
const router = useRouter();

const [form, setForm] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

function handleChange(event) {
setForm({
...form,
[event.target.name]: event.target.value,
});
}

async function handleSubmit(event) {
event.preventDefault();
setLoading(true);

try {
  const result = await signIn.email({
    email: form.email.trim(),
    password: form.password,
  });

  if (result.error) {
    toast.error(
      result.error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
    );
    return;
  }

  toast.success("সফলভাবে সাইন ইন হয়েছে!");

  router.push("/profile");
  router.refresh();
} catch (error) {
  toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
} finally {
  setLoading(false);
}

}

async function handleSocialLogin(provider) {
try {
await signIn.social({
provider,
callbackURL: "/profile",
});
} catch (error) {
toast.error("সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।");
}
}

return ( <main className="auth-page"> <section className="auth-card"> <h1>সাইন ইন</h1>

    <p>
      বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে
      ঢুকুন।
    </p>

    <form onSubmit={handleSubmit} className="auth-form">
      <label htmlFor="email">ইমেইল</label>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <label htmlFor="password">পাসওয়ার্ড</label>

      <input
        id="password"
        name="password"
        type="password"
        placeholder="আপনার পাসওয়ার্ড"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
      </button>
    </form>

    <div className="auth-divider">অথবা</div>

    <div className="social-login">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
      >
        <svg
          className="google-logo"
          viewBox="0 0 48 48"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z"
          />
          <path
            fill="#34A853"
            d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.4 4 9.8 8.3 6.3 14.7z"
          />
          <path
            fill="#FBBC05"
            d="M4 24c0 3.5.9 6.8 2.5 9.7l6.4-5C12.3 27 12 25.5 12 24s.3-3 .9-4.3l-6.6-5C4.8 17.5 4 20.6 4 24z"
          />
          <path
            fill="#EA4335"
            d="M24 44c5.4 0 10.2-2 13.6-5.4l-6.3-5.3C29.6 35.1 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.4 5C9.7 39.4 16.3 44 24 44z"
          />
        </svg>
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>

    <p className="auth-switch">
      অ্যাকাউন্ট নেই?{" "}
      <Link href="/signup">সাইন আপ করুন</Link>
    </p>

    <Link href="/" className="auth-home">
      ← হোম পেজে ফিরে যান
    </Link>
  </section>
</main>

);
}
