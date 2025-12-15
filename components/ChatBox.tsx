export default function ChatBox() {
  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-xl p-4 w-64">
      <p className="font-semibold">Need expert guidance?</p>
      <p className="text-sm text-gray-600 mt-1">
        Leave your message. We’ll respond shortly.
      </p>
      <button className="btn-primary w-full mt-3">
        Start Chat
      </button>
    </div>
  );
}
