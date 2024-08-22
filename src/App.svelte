<script lang="ts">
  import PageNavigation from '@src/components/PageNavigation.svelte'
  import MozButton from './atoms/MozButton.svelte'

  import MozDropdown from './atoms/MozDropdown.svelte'
  import MozToggleable from './atoms/MozToggleable.svelte'
  import PageHeader from './components/PageHeader.svelte'
  import CardHeader from './components/CardHeader.svelte'
  import InputLabel from './components/InputLabel.svelte'
  import SettingsBox from './components/SettingsBox.svelte'
  import SubpageButton from './components/SubpageButton.svelte'
  import SettingsPage from './generated/SettingsPage.svelte'
</script>

<div class="settings-layout">
  <PageNavigation />

  <main>
    <SettingsPage />
    <!-- <PageHeader title="Settings" iconName="shield-16" breadcrumbs={[{ label: 'Home', onClick: () => console.log('Home') }]} />
    <div class="moz-card padding layout">
      <CardHeader title="General" iconName="shield-16" description="General settings" learnMore="https://example.com" />
      <InputLabel label="Enable" description="Enable this feature" learnMore="https://example.com" />
      <InputLabel indent={1} label="Enable" description="Enable this feature" learnMore="https://example.com" />
      <InputLabel indent={2} label="Enable" description="Enable this feature" learnMore="https://example.com" />
      <div>
        <MozButton type="default">Hello!</MozButton>
        <MozButton type="default" disabled>Hello!</MozButton>
        <MozButton type="primary">Hello!</MozButton>
        <MozButton type="ghost">Hello!</MozButton>
        <MozButton type="destructive">Hello!</MozButton>
        <MozButton iconName="shield-16" type="destructive">Hello!</MozButton>
        <MozButton iconName="shield-16" type="destructive" />
        <MozDropdown
        id="dropdown"
        value="1"
        items={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
      />
      <div class="btn-group">
        <SettingsBox subpageLabel="Customize"><InputLabel label="Enable" description="Enable this feature" learnMore="https://example.com" /></SettingsBox>
        <SettingsBox subpageLabel="Customize"><InputLabel label="Enable" description="Enable this feature" learnMore="https://example.com" /></SettingsBox>
        <SubpageButton label="Customize" iconName="shield-16" description="Hello" />
      </div>
      </div>
  </div>
    <MozToggleable id="toggle" type="checkbox" checked />
    <MozToggleable id="toggle" type="radio" checked />
    <MozToggleable id="toggle" type="switch" checked /> -->
  </main>
</div>

<style lang="sass">

.settings-layout
  display: flex
  gap: utils.$size-48
  justify-content: center

main
  width: 600px
  margin-block: utils.$size-64
  display: flex
  flex-direction: column
  gap: utils.$size-24

</style>
