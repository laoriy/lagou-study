import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoHeader from '../TodoHeader.vue'

describe('TodoHeader', () => {
  test('new todo', async () => {
    const wrapper = mount(TodoHeader)
    const input = wrapper.find('input[data-testid="new-todo"]')
    const text = 'play'
    await input.setValue(text)
    await input.trigger('keyup.enter')
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    expect(input.element.value).toBe('')
  })
})
