"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
const router = useRouter();
const { data: session, isPending } = useSession();

const [name, setName] = useState("");
const [saving, setSaving] = useState(false);

const user = session?.user;

useEffect(() => {
if (user?.name) {
setName(user.name);
}
}, [user?.name]);

async function handleSave(event) {
event.preventDefault();

const newName = name.trim();

if (!newName) {
  toast.error("আপনার নাম লিখুন।");
  return;
}

if (newName === user?.name) {
  toast.success("কোনো পরিবর্তন করা হয়নি।");
  return;
}

setSaving(true);

try {
  const response = await fetch("/api/auth/update-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });

  if (!response.ok) {
    throw new Error("Profile update failed");
  }

  toast.success("প্রোফাইল আপডেট হয়েছে!");
  router.refresh();
} catch {
  toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
} finally {
  setSaving(false);
}

}

async function handleSignOut() {
try {
await signOut();
toast.success("সফলভাবে সাইন আউট হয়েছে!");
router.push("/");
router.refresh();
} catch {
toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
}
}

if (isPending) {
return ( <main className="min-h-[70vh] bg-[#f8faf7] flex items-center justify-center px-4"> <p className="text-gray-600">প্রোফাইল লোড হচ্ছে...</p> </main>
);
}

if (!user) {
return ( <main className="min-h-[70vh] bg-[#f8faf7] flex items-center justify-center px-4"> <section className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm"> <h1 className="mb-3 text-2xl font-bold text-gray-900">
আমার প্রোফাইল </h1> <p className="mb-6 text-gray-600">
প্রোফাইল দেখতে প্রথমে সাইন ইন করুন। </p>
<button
type="button"
onClick={() => router.push("/signin")}
className="rounded-lg bg-[#16834a] px-8 py-3 font-semibold text-white hover:bg-[#116b3c]"
>
সাইন ইন </button> </section> </main>
);
}

return ( <main className="min-h-[75vh] bg-[#f8faf7] px-4 py-12 sm:py-16"> <div className="mx-auto w-full max-w-3xl"> <div className="mb-10"> <h1 className="mb-2 text-2xl font-bold text-[#263029] sm:text-3xl">
আমার প্রোফাইল </h1> <p className="text-sm text-[#737b74] sm:text-base">
আপনার অ্যাকাউন্টের তথ্য দেখুন। </p> </div>

    <section className="rounded-2xl border border-[#e7ebe7] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col items-start justify-between gap-5 border-b border-[#e7ebe7] pb-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16834a] text-2xl font-bold text-white">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-[#263029] sm:text-xl">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="mt-1 break-all text-sm text-[#737b74]">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-lg border border-[#16834a] px-4 py-2.5 text-sm font-semibold text-[#16834a] transition hover:bg-[#16834a] hover:text-white"
        >
          <LogOut size={16} />
          সাইন আউট
        </button>
      </div>

      <div className="pt-7">
        <h2 className="mb-6 text-lg font-bold text-[#263029]">
          তথ্য
        </h2>

        <form onSubmit={handleSave}>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-[#737b74]"
          >
            নাম
          </label>

          <input
            id="profile-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            required
            className="mb-6 w-full rounded-lg border border-[#e7ebe7] bg-white px-4 py-3 text-[#263029] outline-none transition focus:border-[#16834a] focus:ring-2 focus:ring-[#16834a]/10"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-[#16834a] px-5 py-3 font-semibold text-white transition hover:bg-[#116b3c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </section>
  </div>
</main>

);
}
