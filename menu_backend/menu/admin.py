"""
Configuración del Panel de Administración para la app Menu
"""
from django.contrib import admin
from django.utils.html import format_html
from .models import Categoria, ItemMenu, ItemImage

class ItemImageInline(admin.TabularInline):
    """
    Inline para manejar múltiples imágenes en el mismo formulario del ítem
    """
    model = ItemImage
    extra = 1
    fields = ('image', 'orden', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit: cover;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = "Vista Previa"


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    """
    Configuración del admin para Categorías
    """
    list_display = ('nombre', 'orden', 'is_active', 'item_count', 'created_at')
    list_filter = ('is_active', 'created_at')
    list_editable = ('orden', 'is_active')
    search_fields = ('nombre',)
    ordering = ('orden', 'nombre')

    def item_count(self, obj):
        return obj.item_count
    item_count.short_description = "Nº de Ítems"


@admin.register(ItemMenu)
class ItemMenuAdmin(admin.ModelAdmin):
    """
    Configuración del admin para Ítems del Menú
    """
    list_display = (
        'nombre', 
        'categoria', 
        'precio', 
        'badges_display', 
        'rating', 
        'is_active',
        'created_at'
    )
    list_filter = ('categoria', 'badges', 'is_active', 'created_at')
    list_editable = ('precio', 'rating', 'is_active')
    search_fields = ('nombre', 'descripcion', 'ingredients')
    ordering = ('categoria__orden', 'nombre')
    inlines = [ItemImageInline]
    
    # Campos para el formulario de edición
    fieldsets = (
        ('Información Básica', {
            'fields': (
                'categoria', 
                'nombre', 
                'descripcion', 
                'precio',
                'badges'
            )
        }),
        ('Detalles Adicionales', {
            'fields': (
                'ingredients',
                'rating',
                'preparation_time', 
                'portions',
                'is_active'
            ),
            'classes': ('collapse',)
        }),
    )

    def badges_display(self, obj):
        if obj.badges:
            badge_dict = dict(ItemMenu.BADGE_OPCIONES)
            return badge_dict.get(obj.badges, obj.badges)
        return "-"
    badges_display.short_description = "Etiqueta"


@admin.register(ItemImage)
class ItemImageAdmin(admin.ModelAdmin):
    """
    Configuración del admin para Imágenes (acceso directo)
    """
    list_display = ('item', 'image_preview', 'orden', 'created_at')
    list_editable = ('orden',)
    list_filter = ('created_at',)
    search_fields = ('item__nombre',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = "Vista Previa"