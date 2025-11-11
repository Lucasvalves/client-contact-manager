import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FormControl, FormMessage } from '@/components/ui/form'
import { FormItem, FormLabel } from '@/components/ui/form'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { enqueueSnackbar } from 'notistack'
import { useAuth } from '@/contexts/AuthContext'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})
const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email, values.password)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      enqueueSnackbar(
        'Falha no login. Verifique suas credenciais e tente novamente.',
        {
          variant: 'error'
        }
      )
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Faça login para continuar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default LoginForm
