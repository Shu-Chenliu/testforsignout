export default function LabelText({label, text}: { label: string, text: string }) {
  return (
    <div className="flex">
      <a className="font-semibold mr-1">{label+"："}</a>
      {text==="" ? "無" : text}
    </div>
  );
}