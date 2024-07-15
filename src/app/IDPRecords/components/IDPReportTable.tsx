"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

function IDPReportTable({data}:{data:string[][]}) {
  return(
    <div className="flex justify-center w-full">
      <div className="w-11/12 overflow-auto">
        <Table className="min-w-full">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          {/* <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            {data.map((row,i)=>(
              <TableRow key={i}>
                {
                  row.map((cell,j) => {
                    const contentWithLineBreaks = cell.replace(/\n/g, '<br>');
                    return (
                      <TableCell key={j}>
                        <a dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }} />
                      </TableCell>
                    )
                  })
                }
                {/* <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell className="text-right">$250.00</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default IDPReportTable;