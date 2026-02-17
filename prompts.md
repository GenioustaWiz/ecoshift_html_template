as a senior software developer, write django code to work with the Charitize html template you had given me earlier. point to note: when you generate models, make sure they all import the Basemodel, this is just an example:"# BaseModel has: is_active, created_at, updated_at, deleted_at, 
from universal.models.base_model import BaseModel 

class Event(BaseModel):", everything else should be designed with future upgrades and expansion in mind