import useAuth from "@/src/data/hook/useAuth"
import Link from "next/link"


interface AvatarUsuarioProps{
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {

    const { usuario } = useAuth()
    return(
        <Link href="/perfil">
            <img src={usuario?.imagemUrl ?? '/images/user.svg'}
                alt="Avatar do Usuario"
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `}/>
        </Link>
    )
}