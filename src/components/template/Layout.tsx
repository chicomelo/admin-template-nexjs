 import useAppData from "@/src/data/hook/useAppData"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import ForcarAutenticacao from "../auth/ForcarAutenticacao"
// import forcarAutenticacao from "../../functions/forcarAutenticacao"

interface LayoutProps{
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps){
    const { tema } = useAppData()
    
    
    return (
        <ForcarAutenticacao>
            <div className={`
                ${tema} flex h-screen w-screen
            `}>
                <MenuLateral />
                <div className={`
                        flex flex-col 
                        w-full p-7 bg-gray-200
                        dark:bg-gray-800`}>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )


    // return forcarAutenticacao(
    //     <div className={`
    //         ${tema} flex h-screen w-screen
    //     `}>
    //         <MenuLateral />
    //         <div className={`
    //                 flex flex-col 
    //                 w-full p-7 bg-gray-200
    //                 dark:bg-gray-800`}>
    //             <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
    //             <Conteudo>
    //                 {props.children}
    //             </Conteudo>
    //         </div>
    //     </div>
    // )
}