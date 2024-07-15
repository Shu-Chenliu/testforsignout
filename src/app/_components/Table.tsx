"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  header: string[];
  data: (string|null)[][];
}

function ShadcnTable({header,data}:Props) {
  return(
    <div className="flex justify-center w-full">
      <div className="overflow-auto">
        <Table className="min-w-full">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {
                header.map((cell,i)=>(
                  <TableHead key={i}>{cell}</TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row,i)=>(
              <TableRow key={i}>
                {
                  row.map((cell,j) => {
                    const contentWithLineBreaks = cell?cell.replace(/\n/g, '<br>'):"-";
                    return (
                      <TableCell key={j}>
                        <a dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }} />
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ShadcnTable;