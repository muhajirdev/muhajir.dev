export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/xgenpdwa"
      className="flex flex-col max-w-lg"
      method="POST"
    >
      <input
        type="email"
        name="email"
        required
        className="border-2 rounded px-4 py-2 outline-none"
        placeholder="email"
      />
      <textarea
        name="message"
        required
        className="border-2 px-4 py-2 rounded h-64 mt-4"
        placeholder="message"
      />
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="uppercase text-white bg-black rounded px-4 py-2"
        >
          Send
        </button>
      </div>
    </form>
  )
}
