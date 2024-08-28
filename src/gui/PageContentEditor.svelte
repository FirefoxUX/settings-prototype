<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import MozIcon, { iconNames } from '@src/atoms/MozIcon.svelte'
  import MozInput from '@src/atoms/MozInput.svelte'
  import { SEPARATOR, type PageContent } from '@src/config-schema'
  import configStore from '@src/ConfigStore'
  import SettingsBoxGroup from '@src/generated/SettingsBoxGroup.svelte'
  import type { CardContentConfig } from '@src/generated/CardContent.svelte'
  import { componentNames } from '@src/generated/CustomComponent.svelte'
  import type { CardConfig } from '@src/generated/SettingsCard.svelte'
  import PrefInput from './input/PrefInput.svelte'
  import SmartInput from './input/SmartInput.svelte'
  import { generateId } from '@src/utils'
  import UndefinedDropdown from './input/UndefinedDropdown.svelte'
  import ConfigGate from './input/ConfigGate.svelte'
  import IconDropdown from './input/IconDropdown.svelte'
  import PageInput from './input/PageInput.svelte'
  import SettingsBoxRadioGroup from '@src/generated/SettingsBoxRadioGroup.svelte'
  import RadioGroup from '@src/generated/RadioGroup.svelte'
  import Branch from '@src/generated/Branch.svelte'
  import DisabledByPrefInput from './input/DisabledByPrefInput.svelte'

  export let pagecontent: PageContent[] | undefined = undefined
  export let card: CardConfig | undefined = undefined
  export let cardcontent: CardContentConfig[] | undefined = undefined
  export let boxgroup: SettingsBoxGroup['config'] | undefined = undefined
  export let boxradioitems: SettingsBoxRadioGroup['items'] | undefined =
    undefined
  export let radioitems: RadioGroup['items'] | undefined = undefined
  export let conditions: Branch['conditions'] | undefined = undefined

  $: allProps = {
    pagecontent: pagecontent,
    card: card,
    cardcontent: cardcontent,
    boxgroup: boxgroup,
    boxradioitems: boxradioitems,
    radioitems: radioitems,
    conditions: conditions,
  }

  const PRESETS = [
    {
      for: 'pagecontent',
      name: 'Custom Component',
      data: {
        kind: 'custom-component',
        name: componentNames[0],
      },
    },
    {
      for: 'pagecontent',
      name: 'Card',
      data: {
        kind: 'card',
        header: {
          title: 'Card title',
        },
        content: [],
      },
    },
    {
      for: 'cardcontent',
      name: 'Custom Component',
      data: {
        kind: 'custom-component',
        name: componentNames[0],
      },
    },
    {
      for: 'cardcontent',
      name: 'Fieldset',
      data: {
        kind: 'fieldset',
        props: {
          title: 'Fieldset title',
          content: [],
        },
      },
    },
    {
      for: 'cardcontent',
      name: 'Toggleable',
      data: {
        kind: 'toggleable',
        pref: undefined,
        props: {
          label: 'Toggleable label',
        },
      },
    },
    {
      for: 'cardcontent',
      name: 'BoxGroup',
      data: {
        kind: 'box-group',
        config: [],
      },
    },
    {
      for: 'cardcontent',
      name: 'Branch',
      data: {
        kind: 'branch',
        pref: undefined,
        conditions: [],
      },
    },
    {
      for: 'cardcontent',
      name: 'Text',
      data: {
        kind: 'text',
        heading: 'Text heading',
      },
    },
    {
      for: 'cardcontent',
      name: 'RadioGroup',
      data: {
        kind: 'radio-group',
        pref: undefined,
        items: [],
      },
    },
    {
      for: 'boxgroup',
      name: 'RadioGroup',
      data: {
        kind: 'radio-group',
        pref: undefined,
        items: [],
      },
    },
    {
      for: 'boxgroup',
      name: 'SubpageButton',
      data: {
        kind: 'subpage-button',
        pageId: undefined,
        props: {
          label: 'Subpage label',
        },
      },
    },
    {
      for: 'boxgroup',
      name: 'Item',
      data: {
        kind: 'item',
        content: [],
      },
    },
    {
      for: 'boxradioitems',
      name: 'RadioGroupItem',
      data: {
        value: true,
        label: 'RadioGroupItem label',
      },
    },
    {
      for: 'radioitems',
      name: 'RadioGroupItem',
      data: {
        value: true,
        label: 'RadioGroupItem label',
      },
    },
    {
      for: 'conditions',
      name: 'BranchCondition',
      data: {
        match: '',
        content: [],
      },
    },
  ]

  const CUSTOM_COMPONENT_OPTIONS = componentNames.map((name) => ({
    value: name,
    label: name,
  }))

  let addOptions: { value: string; label: string }[] = []
  let addValue: string | undefined = undefined

  function moveContent(index: number, direction: number) {
    const prop = Object.values(allProps).find((prop) => prop !== undefined)
    if (prop) {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prop.length) return
      const temp = prop[index]
      prop[index] = prop[newIndex]
      prop[newIndex] = temp
      configStore.forceUpdate()
    }
  }

  function removeContent(index: number) {
    const prop = Object.values(allProps).find((prop) => prop !== undefined)
    if (prop) {
      prop.splice(index, 1)
      configStore.forceUpdate()
    }
  }

  function populateAddOptions(props: typeof allProps) {
    // find the first prop that is not undefined and get its key
    const prop = Object.entries(props).find(([_, value]) => value !== undefined)
    if (prop) {
      addOptions = PRESETS.filter((preset) => preset.for === prop[0]).map(
        (preset) => ({ value: preset.name, label: preset.name }),
      )
      if (!addOptions.find((option) => option.value === addValue)) {
        addValue = addOptions[0]?.value
      }
    }
  }

  function addContent() {
    // find in presets, add the data to the array
    const preset = PRESETS.find((preset) => preset.name === addValue)
    const prop = Object.values(allProps).find((prop) => prop !== undefined)
    if (preset && prop) {
      prop.push({ ...preset.data })
      configStore.forceUpdate()
    }
  }

  $: populateAddOptions(allProps)
</script>

{#if pagecontent}
  <section>
    <div class="heading">
      <p class="et">PageContent</p>
    </div>
    <div class="content">
      {#each pagecontent as content, i}
        <section>
          <div class="heading">
            <p class="et">
              {#if content.kind === 'custom-component'}
                CustomComponent
              {:else if content.kind === 'card'}
                Card
              {:else}
                Unknown element
              {/if}
              <span class="kind">PageContent</span>
            </p>
            <div class="controls">
              <MozButton
                title="Move up"
                iconName="chevron-up-16"
                on:click={() => moveContent(i, -1)}
              />
              <MozButton
                title="Move down"
                iconName="chevron-down-16"
                on:click={() => moveContent(i, 1)}
              />
              <MozButton
                title="Remove"
                iconName="close-16"
                on:click={() => removeContent(i)}
              />
            </div>
          </div>
          <div class="content">
            {#if content.kind === 'custom-component'}
              <MozDropdown
                id="custom-component"
                bind:value={content.name}
                items={CUSTOM_COMPONENT_OPTIONS}
                fillWidth
              />
            {:else if content.kind === 'card'}
              <svelte:self bind:card={content} />
            {:else}
              UI not implemented
            {/if}
          </div>
        </section>
      {/each}
      <div class="add-section">
        <MozDropdown
          id="add-section"
          items={addOptions}
          fillWidth
          bind:value={addValue}
        />
        <MozButton on:click={addContent}>Add</MozButton>
      </div>
    </div>
  </section>
{:else if card}
  <ConfigGate
    bind:valueObj={card}
    valueKey="header"
    title="Header"
    defaultValues={{ title: 'Card title' }}
  >
    {#if card?.header}
      {#each [generateId()] as id}
        <div class="form">
          <label for={`${id}-2`}>Label</label><SmartInput
            id={`${id}-2`}
            placeholder="Label for the input"
            bind:valueObj={card.header}
            valueKey="title"
          />
          <label for={`${id}-3`}>Description</label><SmartInput
            id={`${id}-3`}
            placeholder="Optional description"
            bind:valueObj={card.header}
            valueKey="description"
            canBeUndefined
          />
          <label for={`${id}-4`}>Learn More Link</label><SmartInput
            id={`${id}-4`}
            placeholder="Example: https://example.com"
            bind:valueObj={card.header}
            valueKey="learnMore"
            canBeUndefined
          />
          <label
            title="Resetting to none does not take effect immediately (bug)"
            for={`${id}-5`}>Icon (i)</label
          ><IconDropdown
            id={`${id}-5`}
            bind:valueObj={card.header}
            valueKey="iconName"
            canBeUndefined
          />
        </div>
      {/each}
    {/if}
  </ConfigGate>
  <svelte:self bind:cardcontent={card.content} />
{:else if cardcontent}
  {#each cardcontent as content, i}
    <section>
      <div class="heading">
        <p class="et">
          {#if content.kind === 'custom-component'}
            CustomComponent
          {:else if content.kind === 'fieldset'}
            Fieldset
          {:else if content.kind === 'toggleable'}
            Toggleable
          {:else if content.kind === 'box-group'}
            BoxGroup
          {:else if content.kind === 'branch'}
            Branch
          {:else if content.kind === 'text'}
            Text
          {:else if content.kind === 'radio-group'}
            RadioGroup
          {:else}
            Unknown element
          {/if}
          <span class="kind">CardContent</span>
        </p>
        <div class="controls">
          <MozButton
            title="Move up"
            iconName="chevron-up-16"
            on:click={() => moveContent(i, -1)}
          />
          <MozButton
            title="Move down"
            iconName="chevron-down-16"
            on:click={() => moveContent(i, 1)}
          />
          <MozButton
            title="Remove"
            iconName="close-16"
            on:click={() => removeContent(i)}
          />
        </div>
      </div>
      <div class="content">
        {#if content.kind === 'custom-component'}
          <MozDropdown
            id="custom-component"
            bind:value={content.name}
            items={CUSTOM_COMPONENT_OPTIONS}
            fillWidth
          />
        {:else if content.kind === 'fieldset'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Legend</label><MozInput
                id={`${id}-1`}
                bind:value={content.props.title}
                placeholder="Title"
              />
            </div>
          {/each}
          <svelte:self bind:cardcontent={content.props.content} />
        {:else if content.kind === 'toggleable'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Pref</label><PrefInput
                id={`${id}-1`}
                bind:value={content.pref}
                disallowedTypes={['string', 'number']}
              />
              <label for={`${id}-2`}>Label</label><SmartInput
                id={`${id}-2`}
                placeholder="Label for the input"
                bind:valueObj={content.props}
                valueKey="label"
              />
              <label for={`${id}-3`}>Description</label><SmartInput
                id={`${id}-3`}
                placeholder="Optional description"
                bind:valueObj={content.props}
                valueKey="description"
                canBeUndefined
              />
              <label for={`${id}-4`}>Learn More Link</label><SmartInput
                id={`${id}-4`}
                placeholder="Example: https://example.com"
                bind:valueObj={content.props}
                valueKey="learnMore"
                canBeUndefined
              />
              <label for={`${id}-5`}>Indention</label><SmartInput
                id={`${id}-5`}
                placeholder="Default: 0"
                bind:valueObj={content.props}
                valueKey="indent"
                canBeUndefined
                valueType="number"
              />
              <label
                title="Resetting to default does not take effect immediately (bug)"
                for={`${id}-6`}>Checkbox Type (i)</label
              ><UndefinedDropdown
                id={`${id}-6`}
                bind:valueObj={content.props}
                valueKey="type"
                unsetLabel="Default (Switch)"
                items={[
                  { value: 'switch', label: 'Switch' },
                  { value: 'checkbox', label: 'Checkbox' },
                ]}
              />
            </div>
          {/each}
          <DisabledByPrefInput bind:valueObj={content} valueKey="disabled" />
        {:else if content.kind === 'box-group'}
          <svelte:self bind:boxgroup={content.config} />
        {:else if content.kind === 'radio-group'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Pref</label><PrefInput
                id={`${id}-1`}
                bind:value={content.pref}
              />
            </div>
          {/each}
          <svelte:self bind:radioitems={content.items} />
        {:else if content.kind === 'branch'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Pref</label><PrefInput
                id={`${id}-1`}
                bind:value={content.pref}
              />
            </div>
          {/each}
          <svelte:self bind:conditions={content.conditions} />
        {:else if content.kind === 'text'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Heading</label><SmartInput
                id={`${id}-1`}
                placeholder="Heading"
                bind:valueObj={content}
                valueKey="heading"
                canBeUndefined
              />
              <label for={`${id}-2`}>Description</label><SmartInput
                id={`${id}-2`}
                placeholder="Description"
                bind:valueObj={content}
                valueKey="description"
                canBeUndefined
              />
              <label
                title="Resetting to none does not take effect immediately (bug)"
                for={`${id}-3`}>Icon (i)</label
              ><IconDropdown
                id={`${id}-3`}
                bind:valueObj={content}
                valueKey="iconName"
                canBeUndefined
              />
              <label for={`${id}-4`}>Learn More Link</label><SmartInput
                id={`${id}-4`}
                placeholder="Example: https://example.com"
                bind:valueObj={content}
                valueKey="learnMore"
                canBeUndefined
              />
            </div>
          {/each}
        {:else}
          UI not implemented
        {/if}
      </div>
    </section>
  {/each}
  <div class="add-section">
    <MozDropdown
      id="add-section"
      items={addOptions}
      fillWidth
      bind:value={addValue}
    />
    <MozButton on:click={addContent}>Add</MozButton>
  </div>
{:else if boxgroup}
  <!-- <code><pre>{JSON.stringify(boxgroup, null, 2)}</pre></code> -->

  {#each boxgroup as content, i}
    <section>
      <div class="heading">
        <p class="et">
          {#if content.kind === 'radio-group'}
            RadioGroup
          {:else if content.kind === 'subpage-button'}
            SubpageButton
          {:else if content.kind === 'item'}
            Item
          {:else}
            Unknown groupKind {content.groupKind}
          {/if}
          <span class="kind">BoxGroupItem</span>
        </p>
        <div class="controls">
          <MozButton
            title="Move up"
            iconName="chevron-up-16"
            on:click={() => moveContent(i, -1)}
          />
          <MozButton
            title="Move down"
            iconName="chevron-down-16"
            on:click={() => moveContent(i, 1)}
          />
          <MozButton
            title="Remove"
            iconName="close-16"
            on:click={() => removeContent(i)}
          />
        </div>
      </div>
      <div class="content">
        {#if content.kind === 'radio-group'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Pref</label><PrefInput
                id={`${id}-1`}
                bind:value={content.pref}
              />
            </div>
          {/each}
          <DisabledByPrefInput bind:valueObj={content} valueKey="disabled" />
          <svelte:self bind:boxradioitems={content.items} />
        {:else if content.kind === 'subpage-button'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-1`}>Go to page</label><PageInput
                id={`${id}-1`}
                bind:valueObj={content}
                valueKey="pageId"
              />
              <label for={`${id}-2`}>Label</label><SmartInput
                id={`${id}-2`}
                placeholder="Label"
                bind:valueObj={content.props}
                valueKey="label"
              />
              <label for={`${id}-2`}>Description</label><SmartInput
                id={`${id}-2`}
                placeholder="Description"
                bind:valueObj={content.props}
                valueKey="description"
                canBeUndefined
              />
              <label
                title="Resetting to none does not take effect immediately (bug)"
                for={`${id}-3`}>Icon (i)</label
              ><IconDropdown
                id={`${id}-3`}
                bind:valueObj={content.props}
                valueKey="iconName"
                canBeUndefined
              />
            </div>
          {/each}
          <DisabledByPrefInput bind:valueObj={content} valueKey="disabled" />
        {:else if content.kind === 'item'}
          {#each [generateId()] as id}
            <div class="form">
              <label for={`${id}-2`}>Go to page</label><PageInput
                id={`${id}-2`}
                bind:valueObj={content}
                valueKey="pageId"
                canBeUndefined
              />
            </div>
            <ConfigGate
              bind:valueObj={content}
              valueKey="props"
              title="Show subpage label"
              defaultValues={{ subpageLabel: 'Subpage Label' }}
            >
              {#if content?.props}
                <div class="form">
                  <label for={`${id}-1`}>Subpage Label</label><SmartInput
                    id={`${id}-1`}
                    placeholder="Subpage Label"
                    bind:valueObj={content.props}
                    valueKey="subpageLabel"
                    canBeUndefined
                  />
                </div>
              {/if}
            </ConfigGate>
          {/each}
          <DisabledByPrefInput bind:valueObj={content} valueKey="disabled" />
          <svelte:self bind:cardcontent={content.content} />
        {:else}
          UI not implemented
        {/if}
      </div>
    </section>
  {/each}
  <div class="add-section">
    <MozDropdown
      id="add-section"
      items={addOptions}
      fillWidth
      bind:value={addValue}
    />
    <MozButton on:click={addContent}>Add</MozButton>
  </div>
{:else if boxradioitems}
  {#each boxradioitems as content, i}
    <section>
      <div class="heading">
        <p class="et">
          RadioGroupItem
          <span class="kind">BoxGroupItem</span>
        </p>
        <div class="controls">
          <MozButton
            title="Move up"
            iconName="chevron-up-16"
            on:click={() => moveContent(i, -1)}
          />
          <MozButton
            title="Move down"
            iconName="chevron-down-16"
            on:click={() => moveContent(i, 1)}
          />
          <MozButton
            title="Remove"
            iconName="close-16"
            on:click={() => removeContent(i)}
          />
        </div>
      </div>
      <div class="content">
        {#each [generateId()] as id}
          <div class="form">
            <label for={`${id}-0`}>Value</label><SmartInput
              id={`${id}-0`}
              placeholder="Label"
              bind:valueObj={content}
              valueKey="value"
              valueType="auto"
            />
            <label for={`${id}-1`}>Label</label><SmartInput
              id={`${id}-1`}
              placeholder="Label"
              bind:valueObj={content}
              valueKey="label"
            />
            <label for={`${id}-2`}>Description</label><SmartInput
              id={`${id}-2`}
              placeholder="Description"
              bind:valueObj={content}
              valueKey="description"
              canBeUndefined
            />
            <label for={`${id}-3`}>Learn More Link</label><SmartInput
              id={`${id}-3`}
              placeholder="Example: https://example.com"
              bind:valueObj={content}
              valueKey="learnMore"
              canBeUndefined
            />
          </div>
        {/each}
      </div>
    </section>
  {/each}
  <div class="add-section">
    <MozDropdown
      id="add-section"
      items={addOptions}
      fillWidth
      bind:value={addValue}
    />
    <MozButton on:click={addContent}>Add</MozButton>
  </div>
{:else if radioitems}
  {#each radioitems as content, i}
    <section>
      <div class="heading">
        <p class="et">
          RadioGroupItem {i + 1}
          <span class="kind">RadioGroup</span>
        </p>
        <div class="controls">
          <MozButton
            title="Move up"
            iconName="chevron-up-16"
            on:click={() => moveContent(i, -1)}
          />
          <MozButton
            title="Move down"
            iconName="chevron-down-16"
            on:click={() => moveContent(i, 1)}
          />
          <MozButton
            title="Remove"
            iconName="close-16"
            on:click={() => removeContent(i)}
          />
        </div>
      </div>
      <div class="content">
        {#each [generateId()] as id}
          <div class="form">
            <label for={`${id}-0`}>Value</label><SmartInput
              id={`${id}-0`}
              placeholder="Label"
              bind:valueObj={content}
              valueKey="value"
              valueType="auto"
            />
            <label for={`${id}-1`}>Label</label><SmartInput
              id={`${id}-1`}
              placeholder="Label"
              bind:valueObj={content}
              valueKey="label"
            />
            <label for={`${id}-2`}>Description</label><SmartInput
              id={`${id}-2`}
              placeholder="Description"
              bind:valueObj={content}
              valueKey="description"
              canBeUndefined
            />
            <label for={`${id}-3`}>Learn More Link</label><SmartInput
              id={`${id}-3`}
              placeholder="Example: https://example.com"
              bind:valueObj={content}
              valueKey="learnMore"
              canBeUndefined
            />
          </div>
        {/each}
      </div>
    </section>
  {/each}
  <div class="add-section">
    <MozDropdown
      id="add-section"
      items={addOptions}
      fillWidth
      bind:value={addValue}
    />
    <MozButton on:click={addContent}>Add</MozButton>
  </div>
{:else if conditions}
  {#each conditions as condition, i}
    <section>
      <div class="heading">
        <p class="et">
          BranchCondition
          <span class="kind">Branch</span>
        </p>
        <div class="controls">
          <MozButton
            title="Move up"
            iconName="chevron-up-16"
            on:click={() => moveContent(i, -1)}
          />
          <MozButton
            title="Move down"
            iconName="chevron-down-16"
            on:click={() => moveContent(i, 1)}
          />
          <MozButton
            title="Remove"
            iconName="close-16"
            on:click={() => removeContent(i)}
          />
        </div>
      </div>
      <div class="content">
        {#each [generateId()] as id}
          <div class="form">
            <label for={`${id}-1`}>Value</label><SmartInput
              id={`${id}-1`}
              placeholder="Value"
              bind:valueObj={condition}
              valueKey="match"
              valueType="auto"
            />
          </div>
        {/each}
        <svelte:self bind:cardcontent={condition.content} />
      </div>
    </section>
  {/each}
  <div class="add-section">
    <MozDropdown
      id="add-section"
      items={addOptions}
      fillWidth
      bind:value={addValue}
    />
    <MozButton on:click={addContent}>Add</MozButton>
  </div>
{:else}
  <p>No content</p>
{/if}

<style lang="sass">
section
  display: flex
  flex-direction: column
  border: 1px solid var(--border-color-default)
  border-radius: var(--border-radius-medium)

.et
  font-weight: bold
  .kind
    font-size: 0.7em
    opacity: 0.5
.heading
  display: flex
  align-items: center
  padding: utils.$size-4
  padding-inline-start: utils.$size-8
  border-bottom: 1px solid var(--border-color-default)
  background-color: color-mix(in srgb, var(--border-color-default) 10%, transparent 90%)
  > p
    flex: 1

.content
  padding: utils.$size-8
  display: flex
  flex-direction: column
  gap: utils.$size-8

.form
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-8
  align-items: center

.add-section
  border-top: 1px solid var(--border-color-default)
  margin: - utils.$size-8
  margin-block-start: utils.$size-4
  background-color: color-mix(in srgb, var(--border-color-default) 5%, transparent 90%)
  opacity: 0.5
  padding: utils.$size-8
  display: flex
  justify-content: center
  align-items: center
  gap: utils.$size-8
  &:hover
    opacity: 1
</style>
