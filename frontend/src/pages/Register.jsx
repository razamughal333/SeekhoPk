import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ImageWithFallback from "../components/ImageWithFallback";
import { useAuth } from "../context/AuthContext";

const roleHome = {
  instructor: "/dashboard/instructor",
  student: "/dashboard/student",
};

export default function Register() {
  const { register, authError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await register(name, email, password, role);
    setSubmitting(false);
    if (ok) navigate(roleHome[role] || "/");
  };

  return (
    <Layout>
      <section className="mx-auto grid min-h-[70vh] max-w-4xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <ImageWithFallback
          src="/images/auth-side.jpg"
          alt=""
          className="hidden h-[32rem] w-full border-2 border-ink object-cover md:block"
        />

        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Create an account
          </h1>
          <p className="mt-2 font-body text-ink/60">
            Join SeekhoPakistan as a student or instructor.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">
                Full name
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">
                Password
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            <fieldset className="flex flex-col gap-1.5">
              <legend className="font-body text-sm font-medium text-ink">
                I am joining as a
              </legend>
              <div className="flex gap-3">
                {["student", "instructor"].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 border-2 border-ink py-2 font-body text-sm font-medium capitalize transition-colors ${
                      role === r ? "bg-ink text-bg" : "text-ink hover:bg-ink/5"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            {authError && (
              <p className="font-body text-sm text-red-700">{authError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 border-2 border-ink bg-teal py-2.5 font-body font-medium text-bg transition-colors hover:bg-teal-dark disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 font-body text-sm text-ink/60">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-teal hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
