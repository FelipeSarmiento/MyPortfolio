using System.Reflection;

namespace MyPortfolio.Server;

public class ItemsDashboardModel
{
    public string json { get; set; }
}

public class ItemSettingColor
{
    public string? Id { get; set; }
    public string? IdUniqueIdentifier { get; set; }
    public string? Type { get; set; }
    public string? Color { get; set; }
    public string? Intensity { get; set; }

    public string ConcatenateValuesColors()
    {

        string concatenatedValues = "";
        if (Type != null)
        {
            concatenatedValues += Type + "-";
        }
        if (Color != null)
        {
            concatenatedValues += Color;
        }
        if (Intensity != null && Color != "white" && Color != "black" && Color != "transparent")
        {
            concatenatedValues +=  "-" + Intensity;
        }

        return concatenatedValues;
    }
}

public class ItemSetting
{
    public string? Id { get; set; }
    public string? IdUniqueIdentifier { get; set; }
    public string? ClassName { get; set; }
    public ItemSettingColor? TextColor { get; set; }
    public string? TextSize { get; set; }
    public string? TextWeight { get; set; }
    public string? TextAlign { get; set; }
    public string? TextSpacing { get; set; }
    public string? TextDecoration { get; set; }
    public ItemSettingColor? DecorationColor { get; set; }
    public ItemSettingColor? BackgroundColor { get; set; }
    public string? BorderWidth { get; set; }
    public string? BorderRadius { get; set; }
    public ItemSettingColor? BorderColor { get; set; }
    public string? JustifyContent { get; set; }
    public string? ItemsAlign { get; set; }
    public string? Display { get; set; }
    public string? PaddingRight { get; set; }
    public string? PaddingLeft { get; set; }
    public string? PaddingTop { get; set; }
    public string? PaddingBottom { get; set; }
    public string? MarginRight { get; set; }
    public string? MarginLeft { get; set; }
    public string? MarginTop { get; set; }
    public string? MarginBottom { get; set; }
    public string? Height { get; set; }
    public string? Width { get; set; }
    public string? BorderRight { get; set; }
    public string? BorderLeft { get; set; }
    public string? BorderTop { get; set; }
    public string? BorderBottom { get; set; }
    public string? Opacity { get; set; }

    public string ConcatenateValues()
    {
        PropertyInfo[] properties = typeof(ItemSetting).GetProperties();
        string concatenatedValues = "";
        foreach (PropertyInfo property in properties)
        {
            if (property.Name != nameof(ClassName))
            {
                object? value = property.GetValue(this);
                if (value != null)
                {
                    if (property.PropertyType == typeof(ItemSettingColor))
                    {
                        concatenatedValues += (value as ItemSettingColor)?.ConcatenateValuesColors() + " ";
                    }
                    else
                    {
                        concatenatedValues += value.ToString() + " ";
                    }
                }
            }
        }

        return concatenatedValues;
    }
}

public class Items
{
    public string? Id { get; set; }
    public string? IdUniqueIdentifier { get; set; }
    public string? Type { get; set; }
    public string? Label { get; set; }
    public string? Value { get; set; }
    public ItemSetting? Settings { get; set; }
}

public class Section
{
    public string? Id { get; set; }
    public string Type { get; set; }
    public string Label { get; set; }
    public string? Value { get; set; }
    public List<Items> Items { get; set; }
    public ItemSetting? Settings { get; set; }
    public string? IdUniqueIdentifier { get; set; }
}

public class Root
{
    public List<Section> Sections { get; set; }
    public List<string> Order { get; set; }
}