interface DividerProps {
    text: string
    className?: string
}

export function Divider({ text, className }: DividerProps) {
    return (
        <div className="flex items-center justify-center w-full gap-4 my-8">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent from-10% to-90% to-primary relative">
                <div className="absolute right-0 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>

            <div className="px-4 py-2 rounded-lg bg-black backdrop-blur-sm border-2 border-primary border-opacity-70 text-white">
                {text}
            </div>

            <div className="h-[1px] w-32 bg-gradient-to-r from-primary from-10% to-90% to-transparent relative">
            <div className="absolute left-0 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
        </div>
    )
}
