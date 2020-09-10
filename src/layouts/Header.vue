<template>
	<header class="header">
		<div class="header__top-bar"></div>
		<div class="header__main">
			<aside class="header__side-bar">
				<img src="../assets/svg/menu-icon.svg" alt="burger menu" />
			</aside>
			<div class="header__logo">
				<p>Logo</p>
			</div>
			<picture class="header__avatar">
				<img src="../assets/images/avatar@3x.png" alt="avatar" />
			</picture>
		</div>
	</header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
	padding: 16px;
	background-color: #f6f8f9;
	min-height: 88px;
	min-width: 375px;
	display: flex;
	flex-direction: column;
	&__top-bar {
		flex: 1;
	}
	&__main {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	&__side-bar {
		width: 16px;
		height: 16px;
	}
	&__logo {
		display: flex;
		justify-content: center;
		position: relative;
		p {
			text-transform: uppercase;
			color: #a6adb4;
			font-size: 13px;
			font-weight: bold;
		}
	}
	&__avatar {
		width: 16px;
		height: 16px;
		// border: 1px solid #707070;
		border-radius: 50%;
		img {
			display: block;
			width: 100%;
		}
	}
}
</style>
