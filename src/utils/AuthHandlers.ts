export const AllowOnlyAuthorized = ({ request, reply }: any) => {
    const user = request.session?.user
    if (!user) return reply.status(401).redirect('/auth')
}
