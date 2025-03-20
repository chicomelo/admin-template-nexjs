

interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    tipo?: 'text' | 'email' | 'password'
    naoRenderizarQuando?: boolean
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps){
    return props.naoRenderizarQuando ? null :(
        <div className={`
            flex flex-col
             mt-4
        `}>
            <label>{props.label}</label>
            <input 
                type={props.tipo ?? 'text'} 
                value={props.valor} 
                onChange={e => props.valorMudou?.(e.target.value)} 
                required={props.obrigatorio} 
                className={`
                    px-4 py-3 rounded-lg
                    bg-gray-100 focus:bg-white
                    mt-2
                    border border-gray-100 focus:border-blue-500
                    focus:outline-none
                `}>
            </input>
        </div>
    )
}