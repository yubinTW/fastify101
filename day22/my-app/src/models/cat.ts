import { ICat } from '../types/cat'
import { model, Schema } from 'mongoose'

const catSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
})

export default model<ICat>('Cat', catSchema)
