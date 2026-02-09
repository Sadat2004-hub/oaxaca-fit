export const projectId = '20uoa5py'
export const dataset = 'production'
export const apiVersion = '2024-02-09'

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }

    return v
}
