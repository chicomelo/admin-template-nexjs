import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

    const { cadastrar, login, loginGoogle } = useAuth()

    const [ erro, setErro ] = useState(null)
    const [ modo, setModo ] = useState<'login' | 'cadastro'>('login')
    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const [ confirmacaoSenha, setConfirmacaoSenha ] = useState('')

    function exibirErro(msg: any, tempoEmSegundos = 5){
        setErro(msg)
        setTimeout(()=> setErro(null), tempoEmSegundos * 1000)
    }

    async function submeter(){
        try{
            if(modo === 'login'){
                await login?.(email, senha)
            } else {
                await cadastrar?.(email, senha)
            }
        } catch (e){

            const erro = e as { code: string, message?: string };

            if (erro.code === "auth/user-not-found" || erro.code === "auth/internal-error") {
                exibirErro("Usuário não encontrado. Cadastre-se primeiro.")
            } else if (erro.code === "auth/wrong-password") {
                exibirErro("Senha incorreta. Tente novamente.")
            } else if (erro.code === "auth/invalid-email") {
                exibirErro("E-mail inválido. Verifique e tente novamente.")
            } else {
                exibirErro(erro.message ?? 'Ocorreu um erro inesperado')
            }
        }
    }

    return(

        <div className={`
            flex h-screen items-center justify-center
        `}>
            <div className={`
                hidden md:block md:w-1/2 lg:w-2/3
            `}>
                <img className={`
                    h-screen w-full object-cover
                `}
                 src="https://picsum.photos/2000/2000?random=1" width="300"  alt="Imagem autenticação" />
            </div>
            <div className={`
                m-10 
                flex flex-col 
                w-full md:w-1/2 lg:w-1/3`}>
                
                <h1 className={`
                    text-2xl font-bold mb-5
                `}>
                    {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {erro ? (
                    <div className={`
                        flex items-center gap-3
                        bg-red-400 text-white py-3 px-4 my-2
                        border border-red-500 rounded-lg`}>
                        {IconeAtencao}
                        <span>{erro}</span>
                    </div>
                ): false }
                <AuthInput
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail} 
                    obrigatorio />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha} 
                    obrigatorio />
                <AuthInput
                    label="Confirmação de Senha"
                    tipo="password"
                    valor={confirmacaoSenha}
                    valorMudou={setConfirmacaoSenha} 
                    obrigatorio 
                    naoRenderizarQuando/>

                <button onClick={submeter} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6 cursor-pointer
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastre-se'}
                </button>

                <hr className={`my-6 border-gray-300 w-full`}></hr>
                <button onClick={loginGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                    mb-6 cursor-pointer
                `}>
                    Entrar com Google
                </button>
                {
                    modo === 'login' ? (
                        <p>
                            Novo por aqui?
                            <a onClick={() => setModo('cadastro')}
                                className={`
                                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                                `}> Crie uma conta</a>
                        </p>
                    ) : (
                        <p>
                            Já faz parte da nossa plataforma?
                            <a onClick={() => setModo('login')}
                                className={`
                                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                                `}> Entre com as suas credenciais</a>
                        </p>
                    )
                }

            </div>
        </div>
    )
}