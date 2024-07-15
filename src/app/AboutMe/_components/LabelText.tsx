export default async function LabelText({label, text}: { label: string, text: string }) {
  return (
    <div className="flex items-center text-center gap-1">
      <a className="font-semibold mr-1 text-lg">{label + ": "}</a>
      {text === "" ? "無" : text}
    </div>
  );
}