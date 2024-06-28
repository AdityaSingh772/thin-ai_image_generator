
import sys
from diffusers import StableDiffusionPipeline
import torch



token = sys.argv[1]
prompt = sys.argv[2]

model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, use_auth_token=token)
pipe = pipe.to("cuda")

with torch.autocast("cuda"):
    image = pipe(prompt)["sample"][0]

image_path = f"output_{prompt.replace(' ', '_')}.png"
image.save(image_path)

print(image_path)
