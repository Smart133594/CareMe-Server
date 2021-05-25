<template>
    <div class="error404">
        <div class="page-404-content">
            <div class="container">
                <div class="row full-height">
                    <div class="col-md-12 text-center">
                        <div class="error-image section-space--mb_50">
                            <img class="img-fluid" src="/static/img/404.png" alt="Image Not Found">
                        </div>
                        <h1 class="error-404-title font-weight--light text-white">Oops! Page not found!</h1>
                        <div class="error-buttons section-space--mt_50">
                            <router-link class="ht-btn ht-btn-md" to="/">
                                 <span class="button-icon mr-2 text-white">
                                    <i class="fa fa-home"></i>
                                </span>
                                <span class="button-text text-white">Go back to homepage</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
        metaInfo: {
            title: 'CareMe - Page Not found',
        }
    }
</script>
