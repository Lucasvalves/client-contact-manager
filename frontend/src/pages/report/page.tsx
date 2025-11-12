import useSWR from 'swr'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ICustomer } from '@/interfaces'
import { CustomerService } from '@/services/CustomerService'
import { Button } from '@/components/ui/button'
import { FileDown, UserPlus, Users } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { enqueueSnackbar } from 'notistack'

const customerService = new CustomerService()

const ReportsPage = () => {
  const { data: customers = [], error } = useSWR<ICustomer[]>(
    '/customers',
    () => customerService.list()
  )

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Relatório de Clientes e Contatos', 14, 20)

    let currentY = 30

    customers?.forEach((customer: ICustomer, index: number) => {
      doc.setFontSize(12)
      doc.text(`${index + 1}. ${customer.fullName}`, 14, currentY)
      currentY += 5

      autoTable(doc, {
        startY: currentY,
        head: [['E-mails', 'Telefones', 'Contatos']],
        body: [
          [
            customer.emails?.map((e) => e.email).join(', ') || '-',
            customer.phones?.map((p) => p.phone).join(', ') || '-',
            customer.contacts?.map((c) => c.fullName).join(', ') || '-'
          ]
        ],
        styles: { fontSize: 10 },
        theme: 'striped',
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          if (data.cursor && data.cursor.y) {
            currentY = data.cursor.y + 10
          }
        }
      })
    })

    doc.save('relatorio-clientes.pdf')
    enqueueSnackbar('PDF gerado com sucesso!', { variant: 'success' })
  }
  const totalCustomers = customers.length
  const totalContacts = customers.reduce(
    (acc, c) => acc + (c.contacts?.length || 0),
    0
  )

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6">
        Erro ao carregar clientes.
      </p>
    )
  }

  return (
    <div className="space-y-6 m-auto container px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Relatório de Clientes e Contatos
          </h1>
          <p className=" text-muted-foreground ">
            Visualize e exporte informações completas de clientes e contatos
            vinculados.
          </p>
        </div>
        <Button onClick={handleExportPDF}>
          <FileDown className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {totalContacts}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Contatos
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {totalCustomers}
            </div>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="h-[80vh] rounded-md border p-6 bg-white shadow-sm">
        {customers?.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Nenhum cliente encontrado.
          </p>
        ) : (
          <div className="grid gap-4">
            {customers.map((customer) => (
              <Card
                key={customer.id}
                className="border border-gray-200 hover:shadow-md transition-shadow p-0"
              >
                <CardHeader className="bg-gray-50 border-b px-4 pt-5">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {customer.fullName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 py-4">
                  <div>
                    <p className="font-medium text-sm text-gray-700 mb-1">
                      E-mails
                    </p>
                    {customer.emails?.length ? (
                      <ul className="list-disc ml-5 text-sm text-muted-foreground">
                        {customer.emails.map((e) => (
                          <li key={e.id}>{e.email}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Nenhum e-mail cadastrado
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <p className="font-medium text-sm text-gray-700 mb-1">
                      Telefones
                    </p>
                    {customer.phones?.length ? (
                      <ul className="list-disc ml-5 text-sm text-muted-foreground">
                        {customer.phones.map((p) => (
                          <li key={p.id}>{p.phone}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Nenhum telefone cadastrado
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <p className="font-medium text-sm text-gray-700 mb-1">
                      Contatos vinculados
                    </p>
                    {customer.contacts?.length ? (
                      <ul className="list-disc ml-5 text-sm text-muted-foreground">
                        {customer.contacts.map((c) => (
                          <li key={c.id}>{c.fullName}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Nenhum contato vinculado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ReportsPage
