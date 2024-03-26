<script>
    import { Input, Label, Spinner } from 'flowbite-svelte'
    import { APP_STATUS, appStatusInfo, setAppStatusError } from '../store';
    const { url, pages, id} = $appStatusInfo;

    let loading = false
    let answer = ''

    const numOfImagesToShow = Math.min(pages, 4)
    const images = Array.from({ lengtn: numOfImagesToShow}, (_,i)=>{
        const page = i + 1
        return url
            .replace('/upload/', `/upload/w_400,h540,c_fill,pg_${id}/`)
            .replace('.pdf','.jpg')
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        loading = true

        const question = event.target.question.value

        const searchParams = new URLSearchParams()

        searchParams.append('id', id)
        searchParams.append('question',  question)

        try{
            const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`)

            eventSource.onmessage = (event) => {
                loading = false
                const incomingData = JSON.parse(event.data)

                if(incomingData == '__END__'){
                    eventSource.close()
                    return
                }

                answer += incomingData
            }
            
        }
        catch(e){
            setAppStatusError()
        }
        finally{
            loading = false
        }
    }
</script>

<div class="grid grid-cols-4 gap-2">
{#each images as image}
    <ima class="rounded w-full h-auto aspect-[400/540]" src={image} alt="PDF page"/>
{/each}
</div>

<form on:submit={handleSubmit}>
    <div class="mb-6">
        <Label for="question" class="block mb-2">Deja aquí tu mensaje</Label>
        <Input id="question" type="email" placeholder="Pregunta al PDF aquí">
        </Input>
    </div>
</form>

{#if loading}
    <div class="mt flex justify-center items-center flex-col gap-y-2">
        <Spinner />
        <p class="opacity-75">Esperando respuesta ...</p>
    </div>
{/if}

{#if answer}
    <div class="mt-8">
        <p class="font-medium">Respuesta:</p>
        <p>{answer}</p>
    </div>
{/if}
